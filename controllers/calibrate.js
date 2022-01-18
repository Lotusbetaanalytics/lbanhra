const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const Staff = require("../models/Staff");
const Calibration = require("../models/Calibrate");

exports.calibrate = asyncHandler(async (req, res, next) => {
  req.body.user = req.body.id;
  const user = await Staff.findById(req.body.id);
  const user_name = user.firstname + " " + user.lastname;
  const message = `Dear ${user_name}, Your Appraisal for year 2021 has been calibrated, Here's your score ${req.body.score}`;
  const update = {
    calibrate: true,
  };
  try {
    await sendEmail({
      email: user.email,
      subject: "Calibration",
      cc: "obafemi@lotusbetaanalytics.com",
      message: message,
    });
    await Calibration.create(req.body);
    await Staff.findByIdAndUpdate(req.body.id, update, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      message: "Calibrated successfully!",
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Message could not be sent", 500));
  }
});
