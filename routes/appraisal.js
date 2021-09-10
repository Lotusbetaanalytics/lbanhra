const express = require("express");
const {
  addSectionA,
  getAllSectionA,
  getSectionA,
  addScore,
} = require("../controllers/appraisal");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const AppraisalA = require("../models/AppraisalA");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router
  .route("/")
  .post(protect, addSectionA)
  .get(advancedResults(AppraisalA), getAllSectionA);
router.route("/:id").get(getSectionA);
router.route("/score").post(protect, addScore);

module.exports = router;
