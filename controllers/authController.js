const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// exports.registerUser = async (req, res) => {
//   const { name, email, password, role, department, batch } = req.body;

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     req.flash("error", "User already exists");
//     return res.redirect("/register");
//   }

//   await User.create({
//     name,
//     email,
//     password,
//     role,
//     department,
//     batch,
//     isApproved: role === "student",
//   });

//   req.flash("success", "Registration successful. Please login.");
//   return res.redirect("/login");
// };

exports.registerUser = async (req, res) => {
  const { name, email, password, role, department, batch } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    req.flash("error", "User already exists");
    return res.redirect("/register");
  }

  const profilePhoto = req.file ? `/uploads/profiles/${req.file.filename}` : "";

  await User.create({
    name,
    email,
    password,
    role,
    department,
    batch,
    isApproved: false,
    profilePhoto,
  });

  req.flash("success", "Registration successful. Please login.");
  return res.redirect("/login");
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/login");
  }

  if (!user.isApproved) {
    req.flash("error", "Your account is waiting for admin approval");
    return res.redirect("/login");
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  if (user.role === "admin") return res.redirect("/admin/dashboard");
  if (user.role === "teacher") return res.redirect("/teacher/dashboard");
  return res.redirect("/student/dashboard");
};

exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  req.flash("success", "Logged out successfully");
  res.redirect("/login");
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || user.role !== "admin") {
    req.flash("error", "Access denied. Admin only");
    return res.redirect("/admin/login");
  }

  if (!(await user.matchPassword(password))) {
    req.flash("error", "Invalid credentials");
    return res.redirect("/admin/login");
  }

  const token = generateToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect("/admin/dashboard");
};
