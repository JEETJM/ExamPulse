const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const Exam = require("../models/Exam");
const Result = require("../models/Result");
const Question = require("../models/Question");
const Attempt = require("../models/Attempt");
const User = require("../models/User");
const Announcement = require("../models/Announcement");

router.get("/", (req, res) => {
  res.render("home", { title: "Exam System" });
});

router.get("/login", (req, res) => {
  res.render("auth/login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("auth/register", { title: "Register" });
});

// router.get(
//   "/student/dashboard",
//   protect,
//   allowRoles("student"),
//   async (req, res) => {
//     const results = await Result.find({ student: req.user._id }).populate(
//       "exam",
//     );
//     res.render("student/dashboard", {
//       title: "Student Dashboard",
//       results,
//     });
//   },
// );

router.get(
  "/student/dashboard",
  protect,
  allowRoles("student"),
  async (req, res) => {
    const results = await Result.find({
      student: req.user._id,
    })
      .populate("exam")
      .lean();

    const now = new Date();

    const announcements = await Announcement.find({
      startDate: { $lte: now },
      endDate: { $gte: now },
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.render("student/dashboard", {
      title: "Student Dashboard",
      results,
      announcements,
    });
  },
);

router.get(
  "/teacher/dashboard",
  protect,
  allowRoles("teacher"),
  async (req, res) => {
    const exams = await Exam.find({
      createdBy: req.user._id,
    }).sort({ createdAt: -1 });

    const examIds = exams.map((e) => e._id);

    const questions = await Question.find({
      exam: { $in: examIds },
    })
      .populate("exam")
      .lean();

    const results = await Result.find({
      exam: { $in: examIds },
    })
      .populate("student exam")
      .lean();

    const now = new Date();

    const announcements = await Announcement.find({
      startDate: { $lte: now },
      endDate: { $gte: now },
    })
      .populate("createdBy", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.render("teacher/dashboard", {
      title: "Teacher Dashboard",
      exams,
      questions,
      results,
      announcements,
    });
  },
);
router.get(
  "/student/exams",
  protect,
  allowRoles("student"),
  async (req, res) => {
    const exams = await Exam.find({
      isPublished: true,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.render("student/exams", {
      title: "Available Exams",
      exams,
    });
  },
);

router.get(
  "/student/exams/:id",
  protect,
  allowRoles("student"),
  async (req, res) => {
    const exam = await Exam.findById(req.params.id);
    const questions = await Question.find({ exam: exam._id });
    const attempt = await Attempt.findOne({
      student: req.user._id,
      exam: exam._id,
      submitted: false,
    });

    res.render("student/start-exam", {
      title: exam.title,
      exam,
      questions,
      attempt,
    });
  },
);

router.get(
  "/admin/dashboard",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const pendingTeachers = await User.find({
      role: "teacher",
      isApproved: false,
    });
    const exams = await Exam.find().populate("createdBy", "name email");

    const users = await User.find().sort({ createdAt: -1 });
    const results = await Result.find()
      .populate("student exam").lean()
      .sort({ createdAt: -1 });

    res.render("admin/dashboard", {
      title: "Admin Dashboard",
      totalStudents,
      totalTeachers,
      pendingTeachers,
      exams,
      users,
      results,
    });
  },
);
router.get("/admin/login", (req, res) => {
  res.render("auth/admin-login", { title: "Admin Login" });
});

//student profile
router.get(
  "/student/profile",
  protect,
  allowRoles("student"),
  async (req, res) => {
    res.render("student/profile", {
      title: "My Profile",
      user: req.user,
    });
  },
);

// Teacher Profile
router.get(
  "/teacher/profile",
  protect,
  allowRoles("teacher"),
  async (req, res) => {
    res.render("teacher/profile", {
      title: "Teacher Profile",
      user: req.user,
    });
  },
);

// Admin Profile
router.get("/admin/profile", protect, allowRoles("admin"), async (req, res) => {
  res.render("admin/profile", {
    title: "Admin Profile",
    user: req.user,
  });
});

module.exports = router;
