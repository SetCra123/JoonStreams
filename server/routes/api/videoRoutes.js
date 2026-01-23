const router = require('express').Router();
const {
  getAllVideos,
  getVideoById,
  getFeaturedVideo,
  getTrendingVideos,
  getVideosByGenre,
  searchVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} = require('../../controllers/videoController');
const { protect, adminOnly } = require('../../utils/auth');

// Public routes
router.get('/', getAllVideos);
router.get('/featured', getFeaturedVideo);
router.get('/trending', getTrendingVideos);
router.get('/search', searchVideos);
router.get('/genre/:genre', getVideosByGenre);
router.get('/:id', getVideoById);

// Admin only routes
router.post('/', protect, adminOnly, createVideo);
router.put('/:id', protect, adminOnly, updateVideo);
router.delete('/:id', protect, adminOnly, deleteVideo);

module.exports = router;