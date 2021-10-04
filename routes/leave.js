const express = require("express");
const {
  leave,
} = require("../controllers/leave");
const { authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Leave = require("../models/Leave");
const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router
  .route("/")
  .post(protect, leave)
//   .get(advancedResults(Department), getDepartment);

module.exports = router;
