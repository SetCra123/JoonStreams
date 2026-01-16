const router = require('express').Router();
const {
  addToMyList,
  removeFromMyList,
  getMyList,
  updateWatchProgress,
  getWatchHistory,
} = require('../../controllers/userController');
const { protect } = require('../../utils/auth');

// All routes are protected (require login)
router.use(protect);

// My List routes
router.get('/my-list', getMyList);
router.post('/my-list/:videoId', addToMyList);
router.delete('/my-list/:videoId', removeFromMyList);

// Watch History routes
router.get('/watch-history', getWatchHistory);
router.put('/watch-history/:videoId', updateWatchProgress);

module.exports = router;