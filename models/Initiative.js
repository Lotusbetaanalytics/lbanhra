const mongoose = require("mongoose");

const InitiativeSchema = new mongoose.Schema({
  perspective: {
    type: String,
    required: true,
  },
  objective: {
    type: String,
    required: true,
  },
  measures: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  initiative: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Staff",
  },
  cretaedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Initiative", InitiativeSchema);
