const express = require('express');
const router = express.Router();
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
} = require('../controllers/videoController');

// Public routes
router.get('/', getAllVideos);
router.get('/featured', getFeaturedVideo);
router.get('/trending', getTrendingVideos);
router.get('/search', searchVideos);
router.get('/genre/:genre', getVideosByGenre);
router.get('/:id', getVideoById);

// Admin routes (add authentication middleware later)
router.post('/', createVideo);
router.put('/:id', updateVideo);
router.delete('/:id', deleteVideo);

module.exports = router;