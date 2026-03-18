const User = require("../models/User");
const Exam = require("../models/Exam");

exports.adminDashboard = async (req, res) => {
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalTeachers = await User.countDocuments({ role: "teacher" });
  const pendingTeachers = await User.find({ role: "teacher", isApproved: false });
  const exams = await Exam.find().populate("createdBy", "name email");

  res.render("admin/dashboard", {
    title: "Admin Dashboard",
    totalStudents,
    totalTeachers,
    pendingTeachers,
    exams,
  });
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