const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Initiative = require("../models/Initiative");
const Appraisal = require("../models/Appraisal");

exports.addInitiative = asyncHandler(async (req, res, next) => {
  req.body.user = req.staff.id;
  const appraisal = await Appraisal.findOne({ status: "Started" });
  req.body.year = appraisal.session;

  const initiative = await Initiative.create(req.body);

  if (!initiative) {
    return next(new ErrorResponse("An Error Occured, Please try Again", 400));
  }
  res.status(201).json({
    succes: true,
    data: initiative,
  });
});

exports.getInitiate = asyncHandler(async (req, res, next) => {
  const user_ = req.staff.id;
  const initiative = await Initiative.find({ user: user_ });
  if (!initiative) {
    return res.status(400).json({
      success: false,
      message: "error occured!",
    });
  } else {
    return res.status(200).json({
      success: true,
      data: initiative,
    });
  }
});

// const findInitiative = asyncHandler(async (req, res, next) => {
//     const user_ = req.staff._id;
//     console.log(mongoose.Types.ObjectId.isValid(user_))
// })

exports.deleteInitiate = asyncHandler(async (req, res, next) => {
  const initiative = await Initiative.findByIdAndDelete(req.params.id);

  if (!initiative) {
    return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
  }
  return res.status(200).json({
    success: true,
    data: initiative,
  });
});
