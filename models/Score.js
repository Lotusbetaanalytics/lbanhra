const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AppraisalA",
    required: true,
  },
  score: {
    type: Number,
    required: [true, "Please add Score"],
  },
  managerscore: {
    type: String,
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
