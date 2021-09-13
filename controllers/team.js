const Staff = require("../models/Staff");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getmyTeam = asyncHandler(async (req, res, next) => {
  const myDepartment = await Staff.findById(req.staff.id);
  const member = await Staff.find({ department: myDepartment.department });
  if (!member) {
    return next(new ErrorResponse(`An Error Occurred`, 400));
  } else {
    return res.status(200).json({
      success: true,
      data: member,
    });
  }
});
