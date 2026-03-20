const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { adminLogin } = require("../controllers/authController");

const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

// router.post("/register", registerUser);
router.post("/register", upload.single("profilePhoto"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.post("/admin/login", adminLogin);

module.exports = router;
