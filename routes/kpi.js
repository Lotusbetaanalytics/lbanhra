const express = require("express");
const { myKpi, allKpi } = require("../controllers/kpi");
const { protect } = require("../middleware/auth");
const advancedResults = require("../middleware/advancedResults");
const AppraisalResult = require("../models/AppraisalResult");

const router = express.Router({ mergeParams: true });

router.route("/all").get(
  protect,
  advancedResults(AppraisalResult, {
    path: "user",
    select: "firstname middlename lastname",
  }),
  allKpi
);
router.route("/me").get(protect, myKpi);

module.exports = router;
