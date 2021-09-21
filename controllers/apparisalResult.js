const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const AppraisalResult = require("../models/AppraisalResult");


exports.appraisal = asyncHandler( async(req, res, next) => {
    const result = AppraisalResult.create(req.body);
    if (!result){
        return next(new ErrorResponse(`An error occured`, 400))
    } else {
        return res.status(200).json({
            success: true,
            data: "User record updated!"
        });
    }
});


exports.getScores = asyncHandler(async(req, res, next) => {
    const scores = await AppraisalResult.find({ session: req.params.session, user: req.staff.id });
    if(!scores) {
        return next (new ErrorResponse(`An error occured`, 400))
    } else {
        return res.status(200).json({
            success: true,
            data: scores
        });
    }
});