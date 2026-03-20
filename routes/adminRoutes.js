const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const {
  adminDashboard,
  approveTeacher,
  approveExam,
  deleteUser,
  deleteExam,
  approveStudent,
  createAnnouncement,
  deleteAnnouncement,
} = require("../controllers/adminController");

router.get("/dashboard", protect, allowRoles("admin"), adminDashboard);
router.post(
  "/teachers/:id/approve",
  protect,
  allowRoles("admin"),
  approveTeacher,
);
router.post("/exams/:id/approve", protect, allowRoles("admin"), approveExam);
router.post("/users/:id/delete", protect, allowRoles("admin"), deleteUser);
router.post("/exams/:id/delete", protect, allowRoles("admin"), deleteExam);
router.post("/students/:id/approve", protect, allowRoles("admin"), approveStudent);
router.post("/announcements/create", protect, allowRoles("admin"), createAnnouncement);
router.post("/announcements/:id/delete", protect, allowRoles("admin"), deleteAnnouncement);

module.exports = router;
