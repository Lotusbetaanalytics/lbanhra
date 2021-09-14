const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const AppraisalResult = require("../models/AppraisalResult");
const Score = require("../models/Score");
// @desc    upload Score/
// @route   POST/api/v1/staff/score
// @access   Private/ALL
exports.uploadScore = asyncHandler(async (req, res, next) => {
  req.body.user = req.staff.id;
  req.body.score = req.body.total;
  const checkUser = await AppraisalResult.findOne({ user: req.staff.id });
  if (checkUser !== null) {
    const updateScore = await AppraisalResult.findByIdAndUpdate(
      checkUser._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      data: updateScore,
    });
  } else {
    const appraisal = await AppraisalResult.create(req.body);

    if (!appraisal) {
      return next(new ErrorResponse("An Error Occured, Try Again", 400));
    }
    res.status(201).json({
      success: true,
      data: appraisal,
    });
  }
});

// @desc    get Score/
// @route   GET/api/v1/staff/score
// @access   Private/ALL
exports.getScore = asyncHandler(async (req, res, next) => {
  req.body.user = req.staff.id;
  const score = await Score.find({ user: req.staff.id });
  const total = score.reduce((a, c) => a + c.score, 0);
  const manager = score.reduce((a, c) => a + c.managerscore, 0);
  res.status(200).json({
    success: true,
    data: total,
    manager,
  });
  //   const appraisal = await AppraisalResult.findOne({ user: req.staff.id });

  //   if (!appraisal) {
  //     return next(new ErrorResponse("An Error Occured, Try Again", 400));
  //   }
  //   res.status(200).json({
  //     success: true,
  //     data: appraisal,
  //   });
});


exports.fecthStaffScore = asyncHandler(async(req, res, next) => {
  const staff_score = await Score.find({ user:req.params.id });
  if(!staff_score){
    return next(ErrorResponse(`An error occured`, 400));
  } else {
    return res.status(200).json({
      success: true,
      score: staff_score
    })
  }
})