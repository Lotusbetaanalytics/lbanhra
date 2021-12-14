const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const AppraisalResult = require("../models/AppraisalResult");

exports.myKpi = asyncHandler(async (req, res, next) => {
  const result = await AppraisalResult.find({ user: req.staff.id }).sort(
    "quarter"
  );

  if (!result) {
    return next(new ErrorResponse(`Record not found`, 400));
  }
  res.status(200).json({
    success: true,
    data: result,
  });
});

exports.allKpi = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.firstQuarterKpi = asyncHandler(async (req, res, next) => {
  const result = await AppraisalResult.find({
    quarter: "First Quarter",
  }).populate({ path: "user", select: "firstname middlename lastname" });
  if (!result) {
    return next(new ErrorResponse(`Record not found`, 400));
  }
  res.status(200).json({
    success: true,
    data: result,
  });
});

exports.secondQuarterKpi = asyncHandler(async (req, res, next) => {
  const result = await AppraisalResult.find({
    quarter: "Second Quarter",
  }).populate({ path: "user", select: "firstname middlename lastname" });
  if (!result) {
    return next(new ErrorResponse(`Record not found`, 400));
  }
  res.status(200).json({
    success: true,
    data: result,
  });
});

exports.thirdQuarterKpi = asyncHandler(async (req, res, next) => {
  const result = await AppraisalResult.find({
    quarter: "Third Quarter",
  }).populate({ path: "user", select: "firstname middlename lastname" });
  if (!result) {
    return next(new ErrorResponse(`Record not found`, 400));
  }
  res.status(200).json({
    success: true,
    data: result,
  });
});

exports.fourthQuarterKpi = asyncHandler(async (req, res, next) => {
  const result = await AppraisalResult.find({
    quarter: "Fourth Quarter",
  }).populate({ path: "user", select: "firstname middlename lastname" });
  if (!result) {
    return next(new ErrorResponse(`Record not found`, 400));
  }
  res.status(200).json({
    success: true,
    data: result,
  });
});
