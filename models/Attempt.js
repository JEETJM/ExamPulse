const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  selectedAnswer: { type: String, default: "" },
});

const attemptSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    answers: [answerSchema],
    score: { type: Number, default: 0 },
    submitted: { type: Boolean, default: false },
    submittedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attempt", attemptSchema);