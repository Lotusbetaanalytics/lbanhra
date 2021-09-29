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
