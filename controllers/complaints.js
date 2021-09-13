const Complaint = require("../models/Complaints");
const Suggestion = require("../models/Suggestion");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const Staff = require("../models/Staff");



exports.complaintForm = asyncHandler(async (req, res, next) => {
    const user = await Staff.findById(req.staff.id)
    const user_name = user.firstname + ' ' + user.lastname
    req.body.user = user_name;
    const message = `Dear Team, ${user_name} just filled the complaint form, \n\n Name: ${user_name}
    \n\n Email: ${req.staff.email}\n\n Message: ${req.body.message}`;
  
    try {
      await sendEmail({
        email: "paul@lotusbetaanalytics.com",
        subject: "Complaint",
        cc: "obafemi@lotusbetaanalytics.com",
        message: message
      });
      const complaints = await Complaint.create(req.body);
      res.status(200).json({
        success: true,
        message: "Message sent successfully!"
      });
    } catch (err) {
      console.log(err);
      return next(new ErrorResponse("Message could not be sent", 500));
    }
});


exports.suggestionForm = asyncHandler(async (req, res, next) => {
    const user = await Staff.findById(req.staff.id)
    const user_name = user.firstname + ' ' + user.lastname
    req.body.user = req.staff.id;
    const message = `Dear Team, ${user_name} just filled the suggestion form, \n\n Name: ${user_name}
    \n\n Email: ${req.staff.email}\n\n Message: ${req.body.message}`;
  
    try {
      await sendEmail({
        email: "paul@lotusbetaanalytics.com",
        subject: "Suggestion",
        cc: "obafemi@lotusbetaanalytics.com",
        message: message
      });
      const suggestions = await Suggestion.create(req.body);
      res.status(200).json({
        success: true,
        message: "Message sent successfully!"
      });
    } catch (err) {
      console.log(err);
      return next(new ErrorResponse("Message could not be sent", 500));
    }
});