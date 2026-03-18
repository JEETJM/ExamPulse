const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.redirect("/login");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.redirect("/login");
    }

    req.user = user;
    res.locals.currentUser = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.redirect("/login");
  }
};