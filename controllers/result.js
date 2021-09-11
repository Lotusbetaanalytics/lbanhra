const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const AppraisalResult = require("../models/AppraisalResult");
const Score = require("../models/Score");
// @desc    upload Score/
// @route   POST/api/v1/staff/score
// @access   Private/ALL
exports.uploadScore = asyncHandler(async (req, res, next) => {
  req.body.user = req.staff.id;
  const appraisal = await AppraisalResult.create(req.body);

  if (!appraisal) {
    return next(new ErrorResponse("An Error Occured, Try Again", 400));
  }
  res.status(201).json({
    success: true,
    data: appraisal,
  });
});

// @desc    get Score/
// @route   GET/api/v1/staff/score
// @access   Private/ALL
exports.getScore = asyncHandler(async (req, res, next) => {
  req.body.user = req.staff.id;
  const score = await Score.find({ user: req.staff.id });
  const total = await Score.aggregate([
    {
      user: req.staff.id,
      $group: {
        _id: null,
        sum: {
          $sum: {
            $toInt: "$score",
          },
        },
      },
    },
  ]);
  console.log(total[0].sum);
  res.status(200).json({
    success: true,
    data: score,
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
