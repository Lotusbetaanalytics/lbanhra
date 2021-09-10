const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Staff = require("../models/Staff");
const otpGenerator = require("otp-generator");
const sendEmail = require("../utils/sendEmail");

// @desc    Check if User is Registered
// @route   POST/api/v1/auth/Student/login
// @access   Public
exports.addEmail = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorResponse("Please Provide a valid email address", 400));
  }
  const lban = "lotusbetaanalytics.com";
  const domain = email.substring(email.lastIndexOf("@") + 1);
  if (domain === lban) {
    const staff = await Staff.findOne({ email: email }).select("+password");

    if (staff) {
      return next(new ErrorResponse("User Already Exist", 401));
    } else {
      const code = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
        digits: true,
      });
      req.body.code = code;

      const message = `Dear ${req.body.email}, Welcome to Lotus Beta Analytics, Enter you OTP in the app to verify your email address. Your OTP is ${code}`;

      try {
        await sendEmail({
          email: req.body.email,
          subject: "Staff Portal",
          message,
        });
        const staff = await Staff.create(req.body);
        if (!staff) {
          res.status(400).json({
            success: false,
            message: error,
          });
        }
        res.status(201).json({
          success: false,
          staff,
          password: false,
        });
        // sendTokenResponse(student, 201, res);
      } catch (err) {
        console.log(err);
        return next(
          new ErrorResponse("An Error Occured, Please Try Again", 500)
        );
      }
    }
  } else {
    return next(
      new ErrorResponse(
        "Invalid Email Address, Please Contact LBAN's  IT Department",
        401
      )
    );
  }
});

// @desc    Login User
// @route   POST/api/v1/auth/Staff/login
// @access   Public
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const { email, code } = req.body;

  //validate email & password
  if (!email || !code) {
    return next(new ErrorResponse("Access Code cannot be empty", 400));
  }
  //check for user
  const staff = await Staff.findOne({ email: email });

  if (!staff) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //check if otp match
  const dbCode = staff.code;

  if (dbCode === code) {
    res.status(200).json({
      success: true,
      id: staff._id,
    });
  } else {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
});

// @desc    Log user out / clear cookie
// @route  GET /api/v1/auth/logout
// @access   Private

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Login User
// @route   POST/api/v1/auth/Staff/login
// @access   Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validate email & password
  if (!email || !password) {
    return next(new ErrorResponse("Please Provide an email and password", 400));
  }
  //check for user
  const staff = await Staff.findOne({ email: email }).select("+password");

  if (!staff) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  //check if password match
  const isMatch = await staff.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(staff, 200, res);
});

// @desc    Log user out / clear cookie
// @route  GET /api/v1/auth/logout
// @access   Private

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get current logged in user
// @route   POST/api/v1/auth/me
// @access   Private

exports.getMe = asyncHandler(async (req, res, next) => {
  const staff = await Staff.findById(req.staff.id);
  res.status(200).json({
    success: true,
    data: staff,
  });
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
