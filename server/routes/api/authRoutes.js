const router = require('express').Router();
const {
  registerUser,
  loginUser,
  loginAdmin,
  getMe,
} = require('../../controllers/authController');
const { protect } = require('../../utils/auth');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/admin/login', loginAdmin);

// Protected routes
router.get('/me', protect, getMe);

module.exports = router;