const express = require('express');
const {
    getAllTours,
    createTour,
    getTour,
    updateTour,
    deleteTour,
    checkBody,
    aliasTopTours,
    getTourStats,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');
const {
    getAllReviews,
    createReview,
} = require('../controllers/reviewController');

const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);

router.route('/').get(protect, getAllTours).post(checkBody, createTour);
router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

// router
//     .route('/:tourId/reviews')
//     .post(protect, restrictTo('user'), createReview);
router.use('/:tourId/reviews', reviewRouter);
module.exports = router;
