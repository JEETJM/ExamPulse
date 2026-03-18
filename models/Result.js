const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
    attempt: { type: mongoose.Schema.Types.ObjectId, ref: "Attempt", required: true },
    obtainedMarks: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    status: { type: String, enum: ["Pass", "Fail"], default: "Fail" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);