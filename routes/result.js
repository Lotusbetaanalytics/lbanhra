const express = require("express");
const {
  getScore,
  uploadScore,
  fecthStaffScore,
  setStaffManagerScore,
  notifyManager,
  checkStatus,
  managerScore,
  getManagerScore,
  notifyHR,
} = require("../controllers/result");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const {
  appraisal,
  getScores,
  getCurrentScores,
  devTeam,
} = require("../controllers/apparisalResult");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router.route("/").post(protect, uploadScore);
router.route("/me").get(protect, getScore);
router.route("/myManager/:id").get(protect, getManagerScore);
router.route("/appresult").post(appraisal);
router.route("/appraisalscore/:session").get(protect, getScores);
router.route("/current/:session").get(protect, getCurrentScores);
router
  .route("/:id/:section")
  .get(protect, authorize("Manager"), fecthStaffScore);
router
  .route("/manager")
  .put(protect, authorize("Manager"), setStaffManagerScore);
router.route("/notify/manager").post(protect, notifyManager);
router.route("/notify/hr").post(protect, notifyHR);
router.route("/status").get(protect, checkStatus);
router.route("/manager/score").put(protect, managerScore);
router.route("/dev").post(devTeam);

module.exports = router;
