const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

// DELETE
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new AppError(`No ${document} was founded with that id`, 404));
    }
    res.status(200).json({
      status: 'SUCCESS',
    });
  });

// UPDATE
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return next(new AppError(`No ${document} was founded with that id`, 404));
    }
    res.status(200).json({
      status: 'SUCCESS',
      data: {
        data: document,
      },
    });
  });

// CREATE
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);
    res.status(201).json({
      status: 'SUCCESS',
      data: {
        data: document,
      },
    });
  });

// GET ONE
exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) {
      query = query.populate(populateOptions);
    }
    const document = await query;
    if (!document) {
      return next(new AppError(`No ${document} was founded with that id`, 404));
    }
    res.status(200).json({
      status: 'SUCCESS',
      data: {
        data: document,
      },
    });
  });

// GET ALL
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // Allow nested GET reviews on tour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // EXECUTE QUERY
    const document = await features.query;
    // SEND RESPONSE
    res.status(200).json({
      status: 'SUCCESS',
      results: document.length,
      data: {
        data: document,
      },
    });
  });
