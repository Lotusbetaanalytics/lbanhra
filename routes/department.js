const express = require("express");
const {
  createDepartment,
  getDepartment,
} = require("../controllers/department");
const { authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Department = require("../models/Department");
const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router
  .route("/")
  .post(createDepartment)
  .get(advancedResults(Department), getDepartment);

module.exports = router;
