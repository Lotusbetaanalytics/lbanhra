const express = require("express");
const { addEmail, login, getMe, verifyEmail } = require("../controllers/auth");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Staff = require("../models/Staff");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router.route("/").post(login);
router.route("/addEmail").post(addEmail);
router.route("/verifyEmail").post(verifyEmail);
router.route("/me").get(protect, getMe);

module.exports = router;
