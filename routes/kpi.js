const express = require("express");
const {
  myKpi,
  allKpi,
  firstQuarterKpi,
  secondQuarterKpi,
  thirdQuarterKpi,
  fourthQuarterKpi,
} = require("../controllers/kpi");
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
router.route("/first").get(protect, firstQuarterKpi);
router.route("/second").get(protect, secondQuarterKpi);
router.route("/third").get(protect, thirdQuarterKpi);
router.route("/fourth").get(protect, fourthQuarterKpi);

module.exports = router;
