const mongoose = require("mongoose");

const AppraisalBSchema = new mongoose.Schema({
  perspective: {
    type: String,
    required: [true, "Please add a perspective"],
  },
  objectives: {
    type: String,
    required: [true, "Please add an objective"],
  },
  section: {
    type: String,
    default: "B",
  },
  department: {
    type: String,
    default: "B",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("AppraisalB", AppraisalBSchema);
