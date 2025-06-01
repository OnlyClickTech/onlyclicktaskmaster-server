const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    taskmasterId: {
        type: String,
        ref: 'Taskmaster',
        required: true
    },
    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["completed", "accepted", "ongoing"],
        default: "completed"
    }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
