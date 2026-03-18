const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    questionText: {
      type: String,
      required: true,
      trim: true,
    },
    options: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.length === 4;
        },
        message: "MCQ must have exactly 4 options",
      },
      required: true,
    },
    correctAnswer: {
      type: String,
      enum: ["option1", "option2", "option3", "option4"],
      required: true,
    },
    marks: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);