const express = require("express");
const { score, addInitiative } = require("../controllers/score");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const AppraisalA = require("../models/AppraisalA");
const Appraisal = require("../models/Appraisal");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router.route("/").post(score);
router.route("/a").post(addInitiative);

module.exports = router;
