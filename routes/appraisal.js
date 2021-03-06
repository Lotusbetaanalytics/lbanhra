const express = require("express");
const {
  addSectionA,
  getAllSectionA,
  getSectionA,
  addScore,
  previousScore,
  startAppraisal,
  getCurrentAppraisal,
} = require("../controllers/appraisal");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const AppraisalA = require("../models/AppraisalA");
const Appraisal = require("../models/Appraisal");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router
  .route("/")
  .post(protect, addSectionA)
  .get(advancedResults(AppraisalA), getAllSectionA);
router.route("/:id").get(getSectionA);
router.route("/score").post(protect, addScore);
router.route("/score/:id").get(protect, previousScore);
router
  .route("/start")
  .post(protect, startAppraisal)
  .get(protect, advancedResults(Appraisal), getCurrentAppraisal);
router.route("/current").get(protect, getCurrentAppraisal);

module.exports = router;
