const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    taskmasterId: {
        type: String,
        ref: 'Taskmaster',
        required: true
    },
    reviewerName: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
