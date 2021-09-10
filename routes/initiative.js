const express = require("express");
const router = express.Router();
const { addInitiative, getInitiate } = require("../controllers/initiative");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Initiative = require("../models/Initiative");

router.route("/").post(protect, addInitiative);
router.route("/all").get(protect, advancedResults(Initiative), getInitiate);

module.exports = router;
