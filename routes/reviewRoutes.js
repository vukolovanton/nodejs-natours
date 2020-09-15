const express = require('express');

const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
  setTourUserIds,
} = require('../controllers/reviewController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getReview)
  // .post(createReview)
  .patch(updateReview)
  .delete(deleteReview);

module.exports = router;
