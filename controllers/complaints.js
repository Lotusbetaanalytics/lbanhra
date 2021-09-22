const Complaint = require("../models/Complaints");
const Suggestion = require("../models/Suggestion");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const Staff = require("../models/Staff");

exports.complaintForm = asyncHandler(async (req, res, next) => {
  const user = await Staff.findById(req.staff.id);
  const user_name = user.firstname + " " + user.lastname;
  req.body.user = user_name;
  const message = `Dear Team, ${user_name} just filled the complaint form, \n\n Name: ${user_name}
    \n\n Email: ${req.staff.email}\n\n Message: ${req.body.message}`;

  try {
    await sendEmail({
      email: "paul@lotusbetaanalytics.com",
      subject: "Complaint",
      cc: "obafemi@lotusbetaanalytics.com",
      message: message,
    });
    const complaints = await Complaint.create(req.body);
    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Message could not be sent", 500));
  }
});

exports.suggestionForm = asyncHandler(async (req, res, next) => {
  const user = await Staff.findById(req.staff.id);
  const user_name = user.firstname + " " + user.lastname;
  req.body.user = req.staff.id;

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
                              Dear Team, ${user_name} just filled the suggestion form
                          </td>
                      </tr>

                      <tr>
                          <td height="10"></td>
                      </tr>


                      <tr>
                          <td align="center"
                              style="font-family: 'Lato', sans-serif; font-size:14px; color:#757575; line-height:24px; font-weight: 300;">
                              ${req.body.message}
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
      email: "paul@lotusbetaanalytics.com",
      subject: "Suggestion",
      cc: `obafemi@lotusbetaanalytics.com, ${user.email}`,
      html: html,
    });
    const suggestions = await Suggestion.create(req.body);
    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Message could not be sent", 500));
  }
});
