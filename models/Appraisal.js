const mongoose = require("mongoose");

const AppraisalSchema = new mongoose.Schema({
  aid: {
    type: mongoose.Schema.ObjectId,
    ref: "AppraisalB",
    required: true,
  },
  targets: {
    type: String,
    required: [true, "Please add a perspective"],
  },
  measures: {
    type: String,
    required: [true, "Please add an objective"],
  },
  section: {
    type: String,
    default: "B",
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

module.exports = mongoose.model("Appraisal", AppraisalSchema);
