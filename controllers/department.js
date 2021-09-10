const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Department = require("../models/Department");

// @desc    Create department/
// @route   POST/api/v1/department
// @access   Private/Student
exports.createDepartment = asyncHandler(async (req, res, next) => {
  const department = await Department.create(req.body);

  if (!department) {
    return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
  }
  res.status(201).json({
    success: true,
    data: department,
  });
});

// @desc    get Department/
// @route   GET/api/v1/department
// @access   Private/Student
exports.getDepartment = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
