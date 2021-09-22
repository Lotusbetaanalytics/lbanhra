const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const AppraisalResult = require("../models/AppraisalResult");
const Appraisal = require("../models/Appraisal");

exports.appraisal = asyncHandler(async (req, res, next) => {
  const result = AppraisalResult.create(req.body);
  if (!result) {
    return next(new ErrorResponse(`An error occured`, 400));
  } else {
    return res.status(200).json({
      success: true,
      data: "User record updated!",
    });
  }
});

exports.getCurrentScores = asyncHandler(async (req, res, next) => {
  const appraisal = await Appraisal.findOne({ status: "Started" });
  const scores = await AppraisalResult.findOne({
    session: req.params.session,
    user: req.staff.id,
    quarter: appraisal.quarter,
  });

  return res.status(200).json({
    success: true,
    score: scores ? scores.score : 0,
    manger: scores ? scores.managerscore : 0,
    overall: scores ? scores.overall : 0,
    hr: scores ? scores.hr : 0,
  });
});

exports.getScores = asyncHandler(async (req, res, next) => {
  const firstQuarter = await AppraisalResult.findOne({
    session: req.params.session,
    user: req.staff.id,
    quarter: "First Quarter",
  });
  const secondQuarter = await AppraisalResult.findOne({
    session: req.params.session,
    user: req.staff.id,
    quarter: "Second Quarter",
  });
  const thirdQuarter = await AppraisalResult.findOne({
    session: req.params.session,
    user: req.staff.id,
    quarter: "Third Quarter",
  });
  const fourthQuarter = await AppraisalResult.findOne({
    session: req.params.session,
    user: req.staff.id,
    quarter: "Fourth Quarter",
  });
  const first = firstQuarter && firstQuarter.score;
  const second = secondQuarter && secondQuarter.score;
  const third = thirdQuarter && thirdQuarter.score;
  const fourth = fourthQuarter && fourthQuarter.score;

  return res.status(200).json({
    success: true,
    firstQuarter: first,
    secondQuarter: second,
    thirdQuarter: third,
    fourthQuarter: fourth,
  });
});
