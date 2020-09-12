const express = require('express');

const router = express.Router();

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

router.post('/signup', signup);
router.post('/signup', login);

router.post('/forgot-password', forgotPassword);
router.post('/rest-password', resetPassword);

// ROUTES
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
