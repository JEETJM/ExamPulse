const User = require("../models/User");
const Exam = require("../models/Exam");
const Result = require("../models/Result");
const Announcement = require("../models/Announcement");

exports.adminDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTeachers = await User.countDocuments({ role: "teacher" });

    const pendingTeachers = await User.find({
      role: "teacher",
      isApproved: false,
    });

    const exams = await Exam.find().populate("createdBy", "name email");

    const users = await User.find().sort({ createdAt: -1 });

    const results = await Result.find()
      .populate("student", "name email")
      .populate("exam", "title subject")
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
  } catch (err) {
    console.log("ADMIN DASHBOARD ERROR:", err);
    req.flash("error", "Unable to load admin dashboard");
    res.redirect("/");
  }
};

exports.approveTeacher = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { isApproved: true });
  req.flash("success", "Teacher approved successfully");
  res.redirect("/admin/dashboard");
};

exports.approveExam = async (req, res) => {
  await Exam.findByIdAndUpdate(req.params.id, { isApproved: true });
  req.flash("success", "Exam approved successfully");
  res.redirect("/admin/dashboard");
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      req.flash("error", "User not found");
      return res.redirect("/admin/dashboard");
    }

    if (user.role === "admin") {
      req.flash("error", "Admin account cannot be deleted");
      return res.redirect("/admin/dashboard");
    }

    await User.findByIdAndDelete(req.params.id);

    req.flash("success", "User deleted successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.log("DELETE USER ERROR:", err);
    req.flash("error", "User delete failed");
    res.redirect("/admin/dashboard");
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      req.flash("error", "Exam not found");
      return res.redirect("/admin/dashboard");
    }

    const Question = require("../models/Question");
    const Result = require("../models/Result");
    const Attempt = require("../models/Attempt");

    await Question.deleteMany({ exam: exam._id });
    await Result.deleteMany({ exam: exam._id });
    await Attempt.deleteMany({ exam: exam._id });
    await Exam.findByIdAndDelete(req.params.id);

    req.flash("success", "Exam deleted successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.log("DELETE EXAM ERROR:", err);
    req.flash("error", "Exam delete failed");
    res.redirect("/admin/dashboard");
  }
};

exports.adminDashboard = async (req, res) => {
  try {
    const search = req.query.search ? req.query.search.trim() : "";

    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTeachers = await User.countDocuments({ role: "teacher" });

    const pendingTeachers = await User.find({
      role: "teacher",
      isApproved: false,
    });

    const pendingStudents = await User.find({
      role: "student",
      isApproved: false,
    });

    const exams = await Exam.find().populate("createdBy", "name email");

    let userQuery = {};
    if (search) {
      userQuery = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
    }

    const users = await User.find(userQuery).sort({ createdAt: -1 }).lean();

    const results = await Result.find()
      .populate("student", "name email")
      .populate("exam", "title subject")
      .sort({ createdAt: -1 });

    const announcements = await Announcement.find()
      .populate("createdBy", "name")
      .sort({ createdAt: -1 }).lean();

    res.render("admin/dashboard", {
      title: "Admin Dashboard",
      totalStudents,
      totalTeachers,
      pendingTeachers,
      pendingStudents,
      exams,
      users,
      results,
      announcements,
      search,
    });
  } catch (err) {
    console.log("ADMIN DASHBOARD ERROR:", err);
    req.flash("error", "Unable to load admin dashboard");
    res.redirect("/");
  }
};

exports.approveStudent = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isApproved: true });
    req.flash("success", "Student approved successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.log("APPROVE STUDENT ERROR:", err);
    req.flash("error", "Student approval failed");
    res.redirect("/admin/dashboard");
  }
};

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, message, startDate, endDate } = req.body;

    if (!title || !message || !startDate || !endDate) {
      req.flash(
        "error",
        "Title, message, start date and end date are required",
      );
      return res.redirect("/admin/dashboard");
    }

    if (new Date(endDate) < new Date(startDate)) {
      req.flash("error", "End date must be after start date");
      return res.redirect("/admin/dashboard");
    }

    await Announcement.create({
      title,
      message,
      startDate,
      endDate,
      createdBy: req.user._id,
    });

    req.flash("success", "Announcement created successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.log("CREATE ANNOUNCEMENT ERROR:", err);
    req.flash("error", "Announcement create failed");
    res.redirect("/admin/dashboard");
  }
};

exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    req.flash("success", "Announcement deleted successfully");
    res.redirect("/admin/dashboard");
  } catch (err) {
    console.log("DELETE ANNOUNCEMENT ERROR:", err);
    req.flash("error", "Announcement delete failed");
    res.redirect("/admin/dashboard");
  }
};
