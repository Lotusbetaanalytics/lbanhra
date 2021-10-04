const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
// const AppraisalResult = require("../models/AppraisalResult");
const Leave = require("../models/Leave");

exports.leave = asyncHandler(async (req, res, next) => {
  req.body.user = req.staff.id  
  console.log(req.staff)
//   const result = await Leave.create(req.body);
//   if (!result) {
//     return next(new ErrorResponse(`An error occured`, 400));
//   } // else {
//     return res.status(200).json({
//       success: true,
//       data: result,
//     });
//   }
});
