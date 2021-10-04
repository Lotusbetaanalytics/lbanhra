const express = require("express");
const router = express.Router();
const { startInterview, getUserInterview, getPendingInterview, getAllInterview } =  require("../controllers/exitInterview");
const { protect, authorize } = require("../middleware/auth");

router.route("/").post(protect, startInterview);
router.route("/all").get(protect, getAllInterview);
router.route("/:staff_id").get(protect, authorize("HR"), getUserInterview);
router.route("/interview/pending").get(protect, authorize("HR"), getPendingInterview);


module.exports = router;