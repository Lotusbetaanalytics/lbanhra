const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const AppraisalA = require("../models/AppraisalA");
const Appraisal = require("../models/Appraisal");
const Score = require("../models/Score");

// @desc    Create & Start Appraisal/
// @route   POST/api/v1/staff/appraisal/start
// @access   Private/HR
exports.startAppraisal = asyncHandler(async (req, res, next) => {
  const appraisal = await Appraisal.find({ status: "Started" });

  if (appraisal.length > 0) {
    return next(
      new ErrorResponse(
        "An Appraisal has been started previously, stop to start a new one",
        400
      )
    );
  } else {
    const appraisal = await Appraisal.create(req.body);
    res.status(201).json({
      success: true,
      data: appraisal,
    });
  }
});

// @desc    Start Appraisal By ID/
// @route   POST/api/v1/staff/appraisal/start/:id
// @access   Private/HR
exports.updateAppraisal = asyncHandler(async (req, res, next) => {
  const appraisal = await Appraisal.find({ status: "Started" });

  if (req.body.status === "Started" && appraisal.length > 0) {
    return next(
      new ErrorResponse(
        "An Appraisal has been started previously, stop to start a new one",
        400
      )
    );
  }
  const updateAppraisal = await Appraisal.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: updateAppraisal,
  });
});

// @desc    Get Current Appraisal/
// @route   GET/api/v1/staff/appraisal/start
// @access   Private/ALL
exports.getCurrentAppraisal = asyncHandler(async (req, res, next) => {
  const appraisal = await Appraisal.findOne({ status: "Started" });

  if (!appraisal) {
    return next(new ErrorResponse("Appraisal not Found", 400));
  }
  res.status(201).json({
    success: true,
    data: appraisal,
  });
});

// @desc    Get All Appraisal/
// @route   GET/api/v1/staff/appraisal/start
// @access   Private/HR
exports.getAllAppraisal = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Add Section A Appraisal/
// @route   POST/api/v1/staff/appraisal/sectiona
// @access   Private/HR
exports.addSectionA = asyncHandler(async (req, res, next) => {
  const appraisal = await AppraisalA.create(req.body);

  if (!appraisal) {
    return next(new ErrorResponse("An Error Occured, Please Tray Again", 400));
  }
  res.status(201).json({
    success: true,
    data: appraisal,
  });
});

// @desc    Get all Section A Appraisal/
// @route   GETT/api/v1/staff/appraisal/sectiona
// @access   Private/ALL
exports.getAllSectionA = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get Section A Appraisal by ID
// @route   GETT/api/v1/staff/appraisal/sectiona
// @access   Private/ALL
exports.getSectionA = asyncHandler(async (req, res, next) => {
  const appraisal = await AppraisalA.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: appraisal,
  });
});

// @desc    Add Score/
// @route   POST/api/v1/staff/appraisal/score
// @access   Private/ALL
exports.addScore = asyncHandler(async (req, res, next) => {
  req.body.user = req.staff.id;
  const score = await Score.find({
    question: req.body.question,
    session: req.body.session,
    quarter: req.body.quarter,
  });
  if (score.length > 0) {
    const updateScore = await Score.findByIdAndUpdate(score[0]._id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      data: updateScore,
    });
  } else {
    const createScore = await Score.create(req.body);
    if (!createScore) {
      return next(
        new ErrorResponse("An Error Occured, Please Tray Again", 400)
      );
    }
    res.status(201).json({
      success: true,
      data: createScore,
    });
  }
});

// @desc    get Previous Score/
// @route   GET/api/v1/staff/appraisal/score
// @access   Private/ALL
exports.previousScore = asyncHandler(async (req, res, next) => {
  const score = await Score.findOne({
    question: req.params.id,
    user: req.staff.id,
  });
  if (!score) {
    res.status(200).json({
      success: true,
      data: {
        score: 0,
      },
    });
  } else {
    res.status(200).json({
      success: true,
      data: score,
    });
  }
});

// @desc    get Score/
// @route   GET/api/v1/staff/appraisal/score
// @access   Private/ALL
exports.getScore = asyncHandler(async (req, res, next) => {
  const score = await Score.find({ user: req.staff.id });
  if (!score) {
    res.status(200).json({
      success: true,
      data: {
        score: 0,
      },
    });
  } else {
    res.status(200).json({
      success: true,
      data: score,
    });
  }
});