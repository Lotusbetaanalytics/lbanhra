const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Leave = require("../models/Leave");
const sendEmail = require("../utils/sendEmail");
const { populate } = require("../models/Complaints");
const Staff = require("../models/Staff");


// @desc    Create A Leave Request
// @route   POST /api/v1/staff/leave/
// @access   Private/ALL
exports.leaveRequest = asyncHandler(async(req, res, next) => {
  const current_request = await Leave.findOne({ user: req.staff.id });
  const user = await Staff.findById(req.staff.id).populate({path: 'manager', select: 'email'});
  // console.log(current_request.status);
  if (!current_request || current_request.status === "Rejected"){
    const user_name = req.staff.firstname + " " + req.staff.lastname;
    req.body.user = user._id;
    req.body.manager = req.staff.manager._id
    const leaveResponse = await Leave.create(req.body);
    if(!leaveResponse){
      return next(new ErrorResponse("An error occured"))
    }
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
                              Dear Tobi, ${user_name} just filled the Leave request form.
                          </td>
                      </tr>

                      <tr>
                          <td height="10"></td>
                      </tr>
                  </tbody>
              </table>
          </td>
      </tr>
  </tbody>
</table>`;


    try {
        await sendEmail({
          email: "oluwatobiloba@lotusbetaanalytics.com",
          subject: "Leave Request",
          cc: `${ req.staff.manager.email }, ${ req.staff.email }`,
          html: html,
        });
    } catch (err) {
        // console.log(err);
        return next(new ErrorResponse("Message could not be sent", 500));
    }
    res.status(201).json({
      success: true,
      message: "Leave request created"
    })
  } else {
    
    if (current_request.status === "Pending"){
      return res.status(400).json({
        success: false,
        message: "User already has a pending leave request"
      });
    } else {
      today = new Date();
      end = new Date(current_request.endDate);

      if(current_request.status === "Approved" && end >= today){
        return res.status(400).json({
          success: false,
          message: "Leave is active"
        });
      }
      
    }
  }
});

// @desc    Get All Leave Requests For Current User
// @route   GET /api/v1/staff/leave/get
// @access   Private/ALL
exports.getUserLeaveRequests = asyncHandler(async (req, res, next) => {
  const leave = await Leave.find({user: req.staff.id})

  if (!leave) {
    return new ErrorResponse(
      "No leave request found",
      404
    )
  }

  res.status(200).json({
    sucess: true,
    data: leave
  })
});

// @desc    Get A Leave Request Using ID
// @route   GET /api/v1/staff/leave/:leave_id
// @access   Private/HR
exports.getStaffLeaveRequest = asyncHandler(async (req, res, next) => {
    const leave = await Leave.findById(req.params.leave_id);

    if (!leave) {
      return new ErrorResponse(
        "An error occured",
        404
      )
    }

    res.status(200).json({
        success: true,
        data: leave,
    });
});

// @desc    Get All Leave Requests
// @route   GET /api/v1/staff/leave/all
// @access   Private/ALL
exports.getAllLeaveRequests = asyncHandler(async (req, res, next) => {
  const leave = await Leave.find({});
  console.log(leave)
  if (!leave) {
    return new ErrorResponse("An error occured", 404)
  };
  res.status(200).json({
      success: true,
      data: leave,
  });
});

// @desc    Get A Leave Request Using ID
// @route   GET /api/v1/staff/leave/team/:leave_id
// @access   Private/Manager
exports.getTeamLeaveRequest = asyncHandler(async (req, res, next) => {
  const leave = await Leave.findById(req.params.leave_id);

  if (!leave) {
    return new ErrorResponse("An error occured", 404)
  };
  res.status(200).json({
      success: true,
      data: leave,
  });
});

// @desc    Update A Leave Request Using ID
// @route   GETT/api/v1/staff/leave/update/:leave_id
// @access   Private/HR
exports.updateLeaveRequest = asyncHandler(async (req, res, next) => {
  const leave = await Leave.findById(req.params.leave_id);
  // console.log(req.params);

  if (!leave) {
    return new ErrorResponse("An error occured", 404)
  };

  if (req.body.status === "Approved" || req.body.status === "Rejeted") {
    return next(
      new ErrorResponse("Your Leave request has been completed previously.", 400)
    );
  };
  
  const updateLeave = await Leave.findByIdAndUpdate(
    req.params.leave_id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data: updateLeave,
  });
});
