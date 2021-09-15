const express = require("express");
const { getScore, uploadScore, fecthStaffScore } = require("../controllers/result");
const { protect, authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");


const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router.route("/").post(protect, uploadScore);
router.route("/me").get(protect, getScore);
router.route("/:staff_id/:session/:quarter/:section").get(protect, authorize("Manager"), fecthStaffScore);

module.exports = router;