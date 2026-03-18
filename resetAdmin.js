// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const User = require("./models/User");

// dotenv.config();

// mongoose.connect(process.env.MONGO_URI)
//   .then(async () => {
//     const user = await User.findOne({ email: "jm382118@gmail.com" });

//     if (!user) {
//       console.log("Admin not found");
//       process.exit();
//     }

//     user.password = "Admin@12345";
//     user.role = "admin";
//     user.isApproved = true;
//     user.isActive = true;

//     await user.save();

//     console.log("Admin password reset successfully");
//     process.exit();
//   })
//   .catch((err) => {
//     console.log(err);
//     process.exit(1);
//   });