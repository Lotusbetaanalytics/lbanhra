const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    ref: "Staff",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Encrypt password using bcrypt

module.exports = mongoose.model("Department", DepartmentSchema);
