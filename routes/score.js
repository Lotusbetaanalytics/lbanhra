const express = require("express");
const { score } = require("../controllers/score");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const AppraisalA = require("../models/AppraisalA");
const Appraisal = require("../models/Appraisal");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router.route("/").post(score);

module.exports = router;
