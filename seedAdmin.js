




  const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const ADMIN_EMAIL = "jm382118@gmail.com";
const ADMIN_PASSWORD = "JeeT19JMMJ46296dBusER";

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected...");

    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
      console.log("Admin already exists with this email");
      process.exit();
    }

    await User.create({
      name: "System Admin",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: "admin",
      isApproved: true,
      isActive: true,
    });

    console.log("Admin created successfully");
    console.log("Email:", ADMIN_EMAIL);
    console.log("Password:", ADMIN_PASSWORD);
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });