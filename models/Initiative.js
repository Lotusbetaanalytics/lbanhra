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
  user: {
    type: String,
    ref: 'user',
    required: true
  },
  cretaedAt: {
    type: Date,
    default: Date.now,
  }
});

const InitiativeModel = mongoose.model('Initiative', InitiativeSchema);
module.exports = InitiativeModel;


