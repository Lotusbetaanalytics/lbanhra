const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const AppraisalA = require("../models/AppraisalA");
const Score = require("../models/Score");

// @desc    Add Section A Appraisal/
// @route   POST/api/v1/staff/appraisal/sectiona
// @access   Private/Student
exports.addSectionA = asyncHandler(async (req, res, next) => {
  const appraisal = await AppraisalA.create(req.body);

  if (!appraisal) {
    return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
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

// @desc    Add Score/
// @route   POST/api/v1/staff/appraisal/score
// @access   Private/Student
exports.addScore = asyncHandler(async (req, res, next) => {
  req.body.user = req.staff.id;
  const score = await Score.find({ question: req.body.question });
  if (score.length > 0) {
    const updateScore = await Score.findByIdAndUpdate(score[0]._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: updateScore,
    });
  } else {
    const createScore = await Score.create(req.body);
    if (!createScore) {
      return next(
        new ErrorResponse("An Error Occured, Please Tray Again", 400)
      );
    }
    res.status(201).json({
      success: true,
      data: createScore,
    });
  }
});
