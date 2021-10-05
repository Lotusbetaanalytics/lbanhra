const express = require("express");
const { leaveRequest } = require("../controllers/leave");
const { authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Leave = require("../models/Leave");
const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(protect, leaveRequest)

module.exports = router;