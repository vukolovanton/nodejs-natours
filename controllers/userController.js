const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');

// Support function for filtering objects
const filterObj = (obj, ...allowedFields) => {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObject[el] = obj[el];
  });
  return newObject;
};

exports.getAllUsers = factory.getAll(User);
// exports.getAllUsers = catchAsync(async (req, res) => {
//   const users = await User.find();
//   res.status(200).json({
//     status: 'SUCCESS',
//     results: users.length,
//     data: {
//       users,
//     },
//   });
// });

exports.updateMe = catchAsync(async (req, res, next) => {
  // Create error if user trying update password
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates'), 400);
  }
  // Filter unwanted names that are not allowed for update
  const filteredBody = filterObj(req.body, 'name', 'email');
  // Update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'SUCCESS',
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'SUCCESS',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Please use signup',
  });
};

exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
