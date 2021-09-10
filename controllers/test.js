const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Test = require("../models/Test");

// @desc    Add Test Questions/
// @route   POST/api/v1/staff/test
// @access   Private/Admin
exports.addTest = asyncHandler(async (req, res, next) => {
  const test = await Test.create(req.body);

  if (!test) {
    return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
  }
  res.status(201).json({
    success: true,
    data: test,
  });
});

// @desc    Get all Questions
// @route   GETT/api/v1/staff/test
// @access   Private/Admin
exports.getTest = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
