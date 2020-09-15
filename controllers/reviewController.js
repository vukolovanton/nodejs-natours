const Review = require('../model/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'SUCCESS',
    data: {
      review: newReview,
    },
  });
});

exports.setTourUserIds = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
