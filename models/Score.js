const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "_qid",
  },
  _qid: {
    type: String,
    required: true,
    enum: ["AppraisalA", "Initiative"],
  },
  score: {
    type: Number,
    required: [true, "Please add Score"],
  },
  managerscore: {
    type: Number,
    default: 0,
  },
  section: {
    type: String,
    required: [true, "Please add a Section"],
  },
  session: {
    type: String,
    required: [true, "Please add Session"],
  },
  quarter: {
    type: String,
    required: [true, "Please add Quarter"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Staff",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Score", ScoreSchema);
