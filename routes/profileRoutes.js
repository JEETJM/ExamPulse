const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { updateMyProfile } = require("../controllers/profileController");

router.post("/update", protect, upload.single("profilePhoto"), updateMyProfile);

module.exports = router;