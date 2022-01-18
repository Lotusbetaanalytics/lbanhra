const express = require("express");
const { calibrate } = require("../controllers/calibrate");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.route("/").post(protect, calibrate);

module.exports = router;
