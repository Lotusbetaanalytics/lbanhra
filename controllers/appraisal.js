const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const AppraisalA = require("../models/AppraisalA");

// @desc    Add Section A Appraisal/
// @route   POST/api/v1/staff/appraisal/sectiona
// @access   Private/Student

exports.addSectionA = asyncHandler(async (req, res, next) => {
  const appraisal = await AppraisalA.create(req.body);

  if (!appraisal) {
    return next(new ErrorResponse("An Error Occured, Please Try Again", 400));
  }
  res.status(201).json({
    success: true,
    data: appraisal,
  });
});

// @desc    Get all Section A Appraisal/
// @route   GETT/api/v1/staff/appraisal/sectiona
// @access   Private/Student

exports.getAllSectionA = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Section A Appraisal by ID
// @route   GETT/api/v1/staff/appraisal/sectiona
// @access   Private/Student

exports.getSectionA = asyncHandler(async (req, res, next) => {
  const appraisal = await AppraisalA.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: appraisal,
  });
});
