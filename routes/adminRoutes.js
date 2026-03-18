const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const { adminDashboard, approveTeacher, approveExam } = require("../controllers/adminController");

router.get("/dashboard", protect, allowRoles("admin"), adminDashboard);
router.post("/teachers/:id/approve", protect, allowRoles("admin"), approveTeacher);
router.post("/exams/:id/approve", protect, allowRoles("admin"), approveExam);

module.exports = router;