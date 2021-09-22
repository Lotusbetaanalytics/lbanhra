const express = require("express");
const {
  getScore,
  uploadScore,
  fecthStaffScore,
  setStaffManagerScore,
  notifyManager,
} = require("../controllers/result");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const {
  appraisal,
  getScores,
  getCurrentScores,
} = require("../controllers/apparisalResult");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router.route("/").post(protect, uploadScore);
router.route("/me").get(protect, getScore);
router.route("/appresult").post(appraisal);
router.route("/appraisalscore/:session").get(protect, getScores);
router.route("/current/:session").get(protect, getCurrentScores);
router
  .route("/:staff_id/:session/:quarter/:section")
  .get(protect, authorize("Manager"), fecthStaffScore);
router
  .route("/manager")
  .put(protect, authorize("Manager"), setStaffManagerScore);
router.route("/notify/manager").post(protect, notifyManager);

module.exports = router;
