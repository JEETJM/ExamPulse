const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.updateMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("back");
    }

    const { name, email, department, batch, currentPassword, newPassword } =
      req.body;

    if (name) user.name = name;
    if (email) user.email = email;
    if (department !== undefined) user.department = department;
    if (batch !== undefined) user.batch = batch;

    if (req.file) {
      user.profilePhoto = `/uploads/profiles/${req.file.filename}`;
    }

    if (newPassword && newPassword.trim() !== "") {
      const isMatch = await user.matchPassword(currentPassword || "");
      if (!isMatch) {
        req.flash("error", "Current password is incorrect");
        return res.redirect("back");
      }
      user.password = newPassword;
    }

    if (user.role === "admin") {
      user.department = "Admin";
      user.batch = "N/A";
    }

    await user.save();

    req.flash("success", "Profile updated successfully");
    return res.redirect("back");
  } catch (err) {
    console.log("UPDATE PROFILE ERROR:", err);

    if (err.code === 11000) {
      req.flash("error", "Email already in use");
      return res.redirect("back");
    }

    req.flash("error", "Profile update failed");
    return res.redirect("back");
  }
};
