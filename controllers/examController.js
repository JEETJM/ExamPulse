const Exam = require("../models/Exam");
const Question = require("../models/Question");

exports.createExam = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      duration,
      passingMarks,
      startTime,
      endTime,
    } = req.body;

    await Exam.create({
      title,
      description,
      subject,
      duration,
      passingMarks,
      startTime,
      endTime,
      createdBy: req.user._id,
    });

    req.flash("success", "Exam created successfully");
    res.redirect("/teacher/dashboard");
  } catch (err) {
    console.log("CREATE EXAM ERROR:", err);
    req.flash("error", "Exam create failed");
    res.redirect("/teacher/dashboard");
  }
};

exports.addQuestion = async (req, res) => {
  try {
    const {
      examId,
      questionText,
      option1,
      option2,
      option3,
      option4,
      correctAnswer,
      marks,
    } = req.body;

    if (
      !examId ||
      !questionText ||
      !option1 ||
      !option2 ||
      !option3 ||
      !option4 ||
      !correctAnswer
    ) {
      req.flash("error", "All MCQ fields are required");
      return res.redirect("/teacher/dashboard");
    }

    const exam = await Exam.findOne({
      _id: examId,
      createdBy: req.user._id,
    });

    if (!exam) {
      req.flash("error", "Exam not found or unauthorized");
      return res.redirect("/teacher/dashboard");
    }

    await Question.create({
      exam: examId,
      questionText,
      options: [option1, option2, option3, option4],
      correctAnswer,
      marks: Number(marks) || 1,
    });

    const questions = await Question.find({ exam: examId });
    exam.totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    await exam.save();

    req.flash("success", "MCQ question added successfully");
    res.redirect("/teacher/dashboard");
  } catch (err) {
    console.log("ADD QUESTION ERROR:", err);
    req.flash("error", "Question add failed");
    res.redirect("/teacher/dashboard");
  }
};

exports.publishExam = async (req, res) => {
  try {
    const exam = await Exam.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!exam) {
      req.flash("error", "Exam not found or unauthorized");
      return res.redirect("/teacher/dashboard");
    }

    exam.isPublished = true;
    await exam.save();

    req.flash("success", "Exam published successfully");
    res.redirect("/teacher/dashboard");
  } catch (err) {
    console.log("PUBLISH EXAM ERROR:", err);
    req.flash("error", "Exam publish failed");
    res.redirect("/teacher/dashboard");
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








exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      req.flash("error", "Question not found");
      return res.redirect("/teacher/dashboard");
    }

    const exam = await Exam.findById(question.exam);

    await Question.findByIdAndDelete(req.params.id);

    const questions = await Question.find({ exam: exam._id });
    exam.totalMarks = questions.reduce((sum, q) => sum + q.marks, 0);
    await exam.save();

    req.flash("success", "Question deleted successfully");
    res.redirect("/teacher/dashboard");
  } catch (err) {
    console.log("DELETE QUESTION ERROR:", err);
    req.flash("error", "Delete failed");
    res.redirect("/teacher/dashboard");
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const {
      questionText,
      option1,
      option2,
      option3,
      option4,
      correctAnswer,
      marks,
    } = req.body;

    const question = await Question.findById(req.params.id);
    if (!question) {
      req.flash("error", "Question not found");
      return res.redirect("/teacher/dashboard");
    }

    question.questionText = questionText;
    question.options = [option1, option2, option3, option4];
    question.correctAnswer = correctAnswer;
    question.marks = Number(marks) || 1;

    await question.save();

    req.flash("success", "Question updated successfully");
    res.redirect("/teacher/dashboard");
  } catch (err) {
    console.log("UPDATE QUESTION ERROR:", err);
    req.flash("error", "Update failed");
    res.redirect("/teacher/dashboard");
  }
};