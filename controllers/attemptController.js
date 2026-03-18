const Attempt = require("../models/Attempt");
const Question = require("../models/Question");
const Exam = require("../models/Exam");
const Result = require("../models/Result");

exports.startExam = async (req, res) => {
  const { examId } = req.params;

  let existingAttempt = await Attempt.findOne({
    student: req.user._id,
    exam: examId,
    submitted: false,
  });

  if (!existingAttempt) {
    existingAttempt = await Attempt.create({
      student: req.user._id,
      exam: examId,
      answers: [],
    });
  }

  res.redirect(`/student/exams/${examId}`);
};
exports.submitExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const answers = req.body.answers || {};

    const questions = await Question.find({ exam: examId });
    const exam = await Exam.findById(examId);

    // ❗ duplicate exam submit prevent
    const existingResult = await Result.findOne({
      student: req.user._id,
      exam: examId,
    });

    if (existingResult) {
      req.flash("error", "You have already submitted this exam");
      return res.redirect("/student/dashboard");
    }

    let score = 0;
    const storedAnswers = [];

    for (const q of questions) {
      const selected = answers[q._id] || "";

      storedAnswers.push({
        questionId: q._id,
        selectedAnswer: selected,
      });

      // ✅ correct MCQ compare
      if (selected === q.correctAnswer) {
        score += q.marks;
      }
    }

    const attempt = await Attempt.create({
      student: req.user._id,
      exam: examId,
      answers: storedAnswers,
      score,
      submitted: true,
      submittedAt: new Date(),
    });

    const percentage =
      exam.totalMarks > 0 ? (score / exam.totalMarks) * 100 : 0;

    const status = score >= exam.passingMarks ? "Pass" : "Fail";

    await Result.create({
      student: req.user._id,
      exam: examId,
      attempt: attempt._id,
      obtainedMarks: score,
      totalMarks: exam.totalMarks,
      percentage,
      status,
    });

    req.flash("success", `Exam submitted. Your score is ${score}`);
    res.redirect("/student/dashboard");
  } catch (err) {
    console.log("SUBMIT ERROR:", err);
    req.flash("error", "Something went wrong");
    res.redirect("/student/dashboard");
  }
};









exports.autoSaveAnswer = async (req, res) => {
  try {
    const { examId, questionId, selectedAnswer } = req.body;

    let attempt = await Attempt.findOne({
      student: req.user._id,
      exam: examId,
      submitted: false,
    });

    if (!attempt) {
      attempt = await Attempt.create({
        student: req.user._id,
        exam: examId,
        answers: [],
      });
    }

    const existingAnswer = attempt.answers.find(
      (a) => a.questionId.toString() === questionId
    );

    if (existingAnswer) {
      existingAnswer.selectedAnswer = selectedAnswer;
    } else {
      attempt.answers.push({
        questionId,
        selectedAnswer,
      });
    }

    await attempt.save();
    res.json({ success: true });
  } catch (err) {
    console.log("AUTOSAVE ERROR:", err);
    res.status(500).json({ success: false });
  }
};