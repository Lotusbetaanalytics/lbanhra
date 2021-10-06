const mongoose = require("mongoose");

const LeaveSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    leaveType: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    totalDays: {
        type: String,
    },
    remaininigDays: {
        type: String,
    },
    manager: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
});

module.exports = mongoose.model("Leave", LeaveSchema);