const express = require("express");
const { getScore, uploadScore, fecthStaffScore, setStaffManagerScore } = require("../controllers/result");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const { appraisal, getScores } = require("../controllers/apparisalResult");


const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router.route("/").post(protect, uploadScore);
router.route("/me").get(protect, getScore);
router.route("/appresult").post(appraisal);
router.route("/appraisalscore/:session").get(protect, getScores);
router.route("/:staff_id/:session/:quarter/:section").get(protect, authorize("Manager"), fecthStaffScore);
router.route("/manager").put(protect, authorize("Manager"), setStaffManagerScore);

module.exports = router;