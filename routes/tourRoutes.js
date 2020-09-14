const express = require('express');

const router = express.Router();
const reviewRouter = require('../routes/reviewRoutes');
const { protect, restrictTo } = require('../controllers/authController');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
} = require('../controllers/tourController');

const {
  getAllReviews,
  createReview,
} = require('../controllers/reviewController');

router.route('/').get(protect, getAllTours).post(createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(protect, restrictTo('admin'), deleteTour);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);

router.use('/:tourId/reviews', reviewRouter);

// router.route('/tourId/reviews').post(protect, restrictTo('user'), createReview);

module.exports = router;
