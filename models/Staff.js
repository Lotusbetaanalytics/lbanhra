const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");

const StaffSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  middlename: {
    type: String,
  },
  lastname: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: String,
  },
  state: {
    type: String,
  },
  mobile: {
    type: String,
  },
  cug: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please add Email"],
    unique: true,
  },
  mobile: {
    type: String,
  },
  department: {
    type: String,
  },
  manager: {
    type: mongoose.Schema.ObjectId,
    ref: "Staff",
  },
  code: {
    type: String,
  },
  position: {
    type: String,
  },
  role: {
    type: String,
    enum: ["HR", "Admin", "Manager", "Staff", "Team Lead"],
    default: "Staff",
  },
  password: {
    type: String,
    // required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  location: {
    type: String,
  },
  photo: {
    type: String,
    default: "user.png",
  },
  emergencyContactName: {
    type: String,
  },
  emergencyContactEmail: {
    type: String,
  },
  emergencyContactState: {
    type: String,
  },
  emergencyContactPhone: {
    type: String,
  },
  emergencyContactRelationship: {
    type: String,
  },
  emergencyContactAddress: {
    type: String,
  },
  resumptionDate: { type: String },
  bank: { type: String },
  accountName: { type: String },
  accountNumber: { type: String },
  nin: { type: String },
  bvn: { type: String },
  description: { type: String },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Encrypt password using bcrypt
StaffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//match user entered password to hashed password in db
StaffSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
//Sign JWT and return
StaffSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("Staff", StaffSchema);
