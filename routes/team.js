const express = require("express");
const router = express.Router();
const { getmyTeam } = require("../controllers/team");
const { protect } = require("../middleware/auth");
const Staff = require("../models/Staff");
const advancedResults = require("../middleware/advancedResults")


router.route("/all").get(protect, advancedResults(Staff), getmyTeam);

module.exports = router;