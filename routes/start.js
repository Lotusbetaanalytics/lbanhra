const express = require("express");
const {
  startAppraisal,
  getCurrentAppraisal,
  getAllAppraisal,
  updateAppraisal,
} = require("../controllers/appraisal");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const Appraisal = require("../models/Appraisal");

const router = express.Router({ mergeParams: true });

//router.route("/").post(protect, authorize("SuperAdmin", "Admin"), uploadVideo);

router
  .route("/")
  .post(protect, startAppraisal)
  .get(protect, advancedResults(Appraisal), getAllAppraisal);
router.route("/current").get(protect, getCurrentAppraisal);
router.route("/:id").post(protect, updateAppraisal);

module.exports = router;
