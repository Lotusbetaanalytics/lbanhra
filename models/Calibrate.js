const mongoose = require("mongoose");

const CalibrateSchema = new mongoose.Schema({
  session: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Staff",
  },
  score: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Calibrate", CalibrateSchema);
