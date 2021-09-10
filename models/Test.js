const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  type: {
    type: String,
  },
  question: {
    type: String,
  },
  correct_answer: {
    type: String,
  },
  incorrect_answers: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Encrypt password using bcrypt

module.exports = mongoose.model("Test", TestSchema);
