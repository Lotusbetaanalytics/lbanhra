const mongoose = require("mongoose");

const AppraisalResultSchema = new mongoose.Schema({
  score: {
    type: String,
    required: [true, "Please add Score"],
  },
  managerscore: {
    type: String,
  },
  session: {
    type: String,
    required: [true, "Please add Session"],
  },
  quarter: {
    type: String,
    required: [true, "Please add Quarter"],
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
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

module.exports = mongoose.model("AppraisalResult", AppraisalResultSchema);
