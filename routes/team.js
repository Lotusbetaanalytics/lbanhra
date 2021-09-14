const express = require("express");
const router = express.Router();
const { getmyTeam, getTeamManaged } = require("../controllers/team");
const { protect, authorize } = require("../middleware/auth");
const Staff = require("../models/Staff");
const advancedResults = require("../middleware/advancedResults");


router.route("/all").get(protect, advancedResults(Staff), getmyTeam);
router.route("/managed").get(protect, authorize("Manager"), advancedResults(Staff), getTeamManaged);

module.exports = router;