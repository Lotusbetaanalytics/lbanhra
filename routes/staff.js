const express = require("express");
const {
  createStaff,
  getStaffs,
  getStaff,
  setStaffPassword,
  updateStaff,
  getManager,
} = require("../controllers/staff");
const { authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Staff = require("../models/Staff");
const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);
router
  .route("/")
  .post(createStaff)
  .get(advancedResults(Staff), getStaffs)
  .put(protect, updateStaff);
router.route("/:id").get(getStaff);
router.route("/manager").get(protect, getManager);
router.route("/password/:id").put(setStaffPassword);

module.exports = router;
