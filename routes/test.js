const express = require("express");
const { addTest, getTest } = require("../controllers/test");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Test = require("../models/Test");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router.route("/").post(addTest).get(advancedResults(Test), getTest);
router.route("/questions").get(advancedResults(Test), getTest);
// router.route("/:id").get(getSectionA);

module.exports = router;
