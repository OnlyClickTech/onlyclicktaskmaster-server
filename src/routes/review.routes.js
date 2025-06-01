const express = require('express');
const router = express.Router();
const {
    addReview,
    getReviewsByTaskmaster,
    getAverageRating
} = require('../controllers/review.controller');

router.post('/', addReview);
router.get('/:taskmasterId', getReviewsByTaskmaster);
router.get('/:taskmasterId/average', getAverageRating);

module.exports = router;
