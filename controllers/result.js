const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const AppraisalResult = require("../models/AppraisalResult");
const Score = require("../models/Score");
const Staff = require("../models/Staff");
const sendEmail = require("../utils/sendEmail");
// @desc    upload Score/
// @route   POST/api/v1/staff/score
// @access   Private/ALL
exports.uploadScore = asyncHandler(async (req, res, next) => {
  req.body.user = req.staff.id;
  req.body.score = req.body.total;
  const checkUser = await AppraisalResult.findOne({
    user: req.staff.id,
    session: req.body.session,
    quarter: req.body.quarter,
  });
  if (checkUser !== null) {
    const updateScore = await AppraisalResult.findByIdAndUpdate(
      checkUser._id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      data: updateScore,
    });
  } else {
    const appraisal = await AppraisalResult.create(req.body);

    if (!appraisal) {
      return next(new ErrorResponse("An Error Occured, Try Again", 400));
    }
    res.status(201).json({
      success: true,
      data: appraisal,
    });
  }
});

// @desc    upload Score/
// @route   POST/api/v1/staff/score
// @access   Private/ALL
exports.notifyManager = asyncHandler(async (req, res, next) => {
  req.body.user = req.staff.id;
  req.body.score = req.body.total;
  req.body.status = "Awaiting Manager";
  const user = await Staff.findById(req.staff.id).populate({
    path: "manager",
    select: "email firstname",
  });
  const managerName = user.manager.firstname;
  const managerMail = user.manager.email;
  const checkUser = await AppraisalResult.findOne({
    user: req.staff.id,
    session: req.body.session,
    quarter: req.body.quarter,
  });
  await AppraisalResult.findByIdAndUpdate(checkUser._id, req.body, {
    new: true,
    runValidators: true,
  });

  // Send Email
  const html = `<table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
  <tbody>
      <tr>
          <td align="center">
              <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0">
                  <tbody>
                      <tr>
                          <td align="center" valign="top" bgcolor="#640ad2"
                              style="background:linear-gradient(0deg, rgba(100, 10, 210, 0.8), rgba(100, 10, 210, 0.8)),url(https://lbanstaffportal.herokuapp.com/static/media/tech.45a93050.jpg);background-size:cover; background-position:top;height:230">
                              <table class="col-600" width="600" height="200" border="0" align="center"
                                  cellpadding="0" cellspacing="0">
                                  <tbody>
                                      <tr>
                                          <td align="center" style="line-height: 0px;">
                                              <img style="display:block; line-height:0px; font-size:0px; border:0px;"
                                                  src="https://lbanstaffportal.herokuapp.com/static/media/logo.49e95c77.png"
                                                  width="70" height="70" alt="logo">
                                          </td>
                                      </tr>
                                      <tr>
                                          <td align="center"
                                              style="font-family: 'Raleway', sans-serif; font-size:37px; color:#ffffff;font-weight: bold;">
                                              Lotus Beta Analytics
                                          </td>
                                      </tr>
                                      <tr>
                                          <td align="center"
                                              style="font-family: 'Lato', sans-serif; font-size:15px; color:#ffffff;font-weight: 300;">
                                              Our goal as an organization is to provide our customers with the best
                                              value
                                          </td>
                                      </tr>
                                  </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </td>
      </tr>
      <tr>
          <td align="center">
              <table class="col-600" width="600" border="0" align="center" cellpadding="0" cellspacing="0"
                  style="margin-left:20px; margin-right:20px; border-left: 1px solid #dbd9d9; border-right: 1px solid #dbd9d9;">
                  <tbody>
                      <tr>
                          <td height="35"></td>
                      </tr>

                      <tr>
                          <td align="center"
                              style="font-family: 'Raleway', sans-serif; font-size:22px; font-weight: bold; color:#2a3a4b;">
                              Dear ${managerName}, 
                          </td>
                      </tr>

                      <tr>
                          <td height="10"></td>
                      </tr>


                      <tr>
                          <td align="center"
                              style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                              ${
                                user.firstname + " " + user.lastname
                              } who is a member of your team has completed his/her appraisal.
                              Proceed to the staff portal to evaluate his/her performance

                              <h2>Score: ${req.body.total}</h2>
                          </td>
                      </tr>

                  </tbody>
              </table>
          </td>
      </tr>
  </tbody>
</table>`;

  try {
    await sendEmail({
      email: `${managerMail}`,
      subject: "LBAN KPI",
      cc: `oluwatobiloba@lotusbetaanalytics.com, ${user.email}`,
      html: html,
    });
    res.status(200).json({
      success: true,
      data: "Message Sent",
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Message could not be sent", 500));
  }
});

// @desc    get Score/
// @route   GET/api/v1/staff/score
// @access   Private/ALL
exports.getScore = asyncHandler(async (req, res, next) => {
  req.body.user = req.staff.id;
  const score = await Score.find({ user: req.staff.id });
  const total = score.reduce((a, c) => a + c.score, 0);
  const manager = score.reduce((a, c) => a + c.managerscore, 0);
  res.status(200).json({
    success: true,
    data: total,
    manager,
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

exports.fecthStaffScore = asyncHandler(async (req, res, next) => {
  const staff_score = await Score.find({
    user: req.params.staff_id,
    session: req.params.session,
    quarter: req.params.quarter,
    section: req.params.section,
  }).populate("question");
  if (staff_score.length < 0) {
    return next(new ErrorResponse(`An Error Occurred`, 400));
  } else {
    return res.status(200).json({
      success: true,
      data: staff_score,
    });
  }
});

exports.setStaffManagerScore = asyncHandler(async (req, res, next) => {
  const manager_score = await Score.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!manager_score) {
    return next(new ErrorResponse(`An error occured`, 400));
  } else {
    return res.status(200).json({
      success: true,
      message: manager_score,
    });
  }
});
