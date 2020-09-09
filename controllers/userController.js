const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'SUCCESS',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'SUCCESS',
  });
};
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'SUCCESS',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'SUCCESS',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'SUCCESS',
  });
};
