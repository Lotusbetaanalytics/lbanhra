const express = require("express");
const { getScore, uploadScore } = require("../controllers/result");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router.route("/").post(protect, uploadScore);
router.route("/me").get(protect, getScore);

module.exports = router;
