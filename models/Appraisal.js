const mongoose = require("mongoose");

const AppraisalSchema = new mongoose.Schema({
  session: {
    type: String,
    required: [true, "Please add sesssion"],
  },
  quarter: {
    type: String,
    required: [true, "Please add  Quarter"],
  },
  status: {
    type: String,
    required: [true, "Please add  status"],
    default: "Started",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appraisal", AppraisalSchema);