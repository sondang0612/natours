const express = require('express');
const {
    createReview,
    getAllReviews,
    deleteReview,
    updateReview,
    setTourUserIds,
    getReview,
} = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

// mergeParams: nested route
const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getAllReviews)
    .post(protect, restrictTo('user'), setTourUserIds, createReview);

router.route('/:id').get(getReview).delete(deleteReview).patch(updateReview);

module.exports = router;
