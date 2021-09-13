const Staff = require("../models/Staff");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getmyTeam = asyncHandler(async (req, res, next) => {
    const member = await Staff.find({ department: Staff.findById(req.staff.id).department});
    if (!member) {
            return res.status(400).json({
            success: false,
            message: "error occured!",
        });
    } else {
            return res.status(200).json({
            success: true,
            data: member,
        });
    }
  
});