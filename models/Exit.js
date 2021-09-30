const mongoose = require('mongoose');

const ExitSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Staff",
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    questions: [{
        Question:String, 
        Response: String
    }],
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending"
    }
});

module.exports = mongoose.model('Exit', ExitSchema);