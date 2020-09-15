const Tour = require('../model/tourModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

//Get All Tours
exports.getAllTours = factory.getAll(Tour);
// exports.getAllTours = catchAsync(async (req, res, next) => {
//   const features = new APIFeatures(Tour.find(), req.query)
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   // EXECUTE QUERY
//   const tours = await features.query;
//   // SEND RESPONSE
//   res.status(200).json({
//     status: 'SUCCESS',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });

// Get Singlie Tour
exports.getTour = factory.getOne(Tour, { path: 'reviews' });
// exports.getTour = catchAsync(async (req, res, next) => {
//   const tour = await Tour.findById(req.params.id).populate('reviews');
//   res.status(200).json({
//     status: 'SUCCESS',
//     data: {
//       tour,
//     },
//   });
// });

//Create Tour
exports.createTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.create(req.body);
  res.status(201).json({
    status: 'SUCCESS',
    data: {
      tour,
    },
  });
});

// Update Tour
exports.updateTour = factory.updateOne(Tour);
// exports.updateTour = catchAsync(async (req, res, next) => {
//   const tour = Tour.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//   });
//   res.status(200).json({
//     status: 'SUCCESS',
//     data: {
//       tour,
//     },
//   });
// });

// Delete tour
exports.deleteTour = factory.deleteOne(Tour);
// exports.deleteTour = catchAsync(async (req, res, next) => {
//   await Tour.findByIdAndDelete(req.params.id);
//   res.status(200).json({
//     status: 'SUCCESS',
//   });
// });

exports.getTourStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: null,
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
  ]);

  res.stats(200).json({
    status: 'SUCCESS',
    data: { stats },
  });
});
