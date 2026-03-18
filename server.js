const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const ejsMate = require("ejs-mate");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan("dev"));
app.use(helmet({ contentSecurityPolicy: false }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    message: "Too many requests. Please try again later.",
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "exam-secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = null;
  next();
});

app.use("/auth", require("./routes/authRoutes"));
app.use("/exams", require("./routes/examRoutes"));
app.use("/attempts", require("./routes/attemptRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/", require("./routes/viewRoutes"));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message || "Something went wrong");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});