const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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
