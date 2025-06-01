const Review = require('../models/review.model');

const addReview = async (req, res) => {
    try {
        const { taskmasterId, reviewerName, rating, comment } = req.body;

        const review = new Review({ taskmasterId, reviewerName, rating, comment });
        const savedReview = await review.save();

        res.status(201).json(savedReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getReviewsByTaskmaster = async (req, res) => {
    try {
        const { taskmasterId } = req.params;

        const reviews = await Review.find({ taskmasterId }).sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAverageRating = async (req, res) => {
    try {
        const { taskmasterId } = req.params;

        const result = await Review.aggregate([
            { $match: { taskmasterId } },
            { $group: { _id: null, averageRating: { $avg: "$rating" } } }
        ]);

        const averageRating = result[0]?.averageRating || 0;
        res.status(200).json({ averageRating: averageRating.toFixed(2) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addReview,
    getReviewsByTaskmaster,
    getAverageRating
};
