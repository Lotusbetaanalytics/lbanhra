const express = require("express");
const { 
  leaveRequest,
  getLeaveRequest,
  getUserLeaveRequests,
  getTeamLeaveRequest,
  getStaffLeaveRequest,
  getAllLeaveRequests,
  updateLeaveRequest
} = require("../controllers/leave");
const { authorize } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Leave = require("../models/Leave");
const { protect } = require("../middleware/auth");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(protect, leaveRequest)
router.route("/get").get(protect, getUserLeaveRequests)
router.route("/all").get(protect, authorize("HR"), getAllLeaveRequests)
router.route("/:leave_id").get(protect, authorize("HR"), getStaffLeaveRequest)
router.route("/team/:leave_id").get(protect, authorize("Manager"), getTeamLeaveRequest)
router.route("/update/:leave_id").put(protect, authorize("HR"), updateLeaveRequest)

module.exports = router;