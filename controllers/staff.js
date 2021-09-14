const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Staff = require("../models/Staff");
const path = require("path");

// @desc    Create Staff/
// @route   POST/api/v1/Student/register
// @access   Private/Student
exports.createStaff = asyncHandler(async (req, res, next) => {
  const staff = await Staff.create(req.body);

  if (!staff) {
    return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
  }
  res.status(201).json({
    success: true,
    data: staff,
  });
});

// @desc    Get Staffs/
// @route   GET/api/v1/auth/Student/register
// @access   Private/Admin/HR/MAnager
exports.getStaffs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Staffs by id/
// @route   GET/api/v1/staff/:id
// @access   Private/Admin/HR/MAnager
exports.getStaff = asyncHandler(async (req, res, next) => {
  const staff = await Staff.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: staff,
  });
});

// @desc    Get all MAnagers/
// @route   GET/api/v1/staff/managers
// @access   Private/
exports.getManager = asyncHandler(async (req, res, next) => {
  const role = `Manager`;
  const staff = await Staff.find({ role: role });

  res.status(200).json({
    success: true,
    staff,
    // id: staff._id,
    // firstname: staff.firstname,
    // lastname: staff.lastname,
  });
});

// @desc    Update staff
// @route   PUT/api/v1/auth/users/:id
// @access   Private/
exports.updateStaff = asyncHandler(async (req, res, next) => {
  const staff = await Staff.findByIdAndUpdate(req.staff.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: staff,
  });
});

// @desc    Set Staff PAssword/
// @route   GET/api/v1/staff/password/:id
// @access   Private
exports.setStaffPassword = asyncHandler(async (req, res, next) => {
  let staff = await Staff.findById(req.params.id);
  staff.password = req.body.password;
  await staff.save();
  sendTokenResponse(staff, 200, res);
});

//Get token from model, create cookie and send response
const sendTokenResponse = (staff, statusCode, res) => {
  //create token
  const token = staff.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

// @desc   Upload Dsipaly Photo/
// @route   GET/api/v1/staff/upload
// @access   Private
exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please Upload a picture`, 400));
  }

  const file = req.files.file;
  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please Upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(new ErrorResponse(`Please Upload an image less than 5MB`, 400));
  }

  //crete custom filename
  file.name = `photo_${req.staff.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`An error occured while uploading`, 500));
    }
    await Staff.findByIdAndUpdate(req.staff.id, { photo: file.name });
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
