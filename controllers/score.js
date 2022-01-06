const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const AppraisalResult = require("../models/AppraisalResult");
const Appraisal = require("../models/Appraisal");
const Score = require("../models/Score");
const Staff = require("../models/Staff");
const sendEmail = require("../utils/sendEmail");
// @desc    upload Score/
// @route   POST/api/v1/staff/score
// @access   Private/ALL
exports.score = asyncHandler(async (req, res, next) => {
  const updateScore = await Score.create(req.body);

  res.status(200).json({
    success: true,
    data: updateScore,
  });
});
