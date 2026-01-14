const Video = require('../models/Video');


// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
const getAllVideos = async (req, res) => {
    try {
      const videos = await Video.find({}).sort({ createdAt: -1 });
      res.json({
        success: true,
        count: videos.length,
        data: videos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  
  // @desc    Get single video by ID
  // @route   GET /api/videos/:id
  // @access  Public
  const getVideoById = async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
  
      if (!video) {
        return res.status(404).json({
          success: false,
          message: 'Video not found',
        });
      }
  
      // Increment view count
      video.views += 1;
      await video.save();
  
      res.json({
        success: true,
        data: video,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  
  // @desc    Get featured video
  // @route   GET /api/videos/featured
  // @access  Public
  const getFeaturedVideo = async (req, res) => {
    try {
      const video = await Video.findOne({ featured: true });
  
      if (!video) {
        return res.status(404).json({
          success: false,
          message: 'No featured video found',
        });
      }
  
      res.json({
        success: true,
        data: video,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  
  // @desc    Get trending videos
  // @route   GET /api/videos/trending
  // @access  Public
  const getTrendingVideos = async (req, res) => {
    try {
      const videos = await Video.find({ trending: true }).limit(10);
  
      res.json({
        success: true,
        count: videos.length,
        data: videos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  
  // @desc    Get videos by genre
  // @route   GET /api/videos/genre/:genre
  // @access  Public
  const getVideosByGenre = async (req, res) => {
    try {
      const videos = await Video.find({ 
        genre: { $in: [req.params.genre] } 
      }).limit(20);
  
      res.json({
        success: true,
        count: videos.length,
        data: videos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  
  // @desc    Search videos
  // @route   GET /api/videos/search?q=query
  // @access  Public
  const searchVideos = async (req, res) => {
    try {
      const { q } = req.query;
  
      if (!q) {
        return res.status(400).json({
          success: false,
          message: 'Search query is required',
        });
      }
  
      const videos = await Video.find({
        $text: { $search: q }
      }).limit(20);
  
      res.json({
        success: true,
        count: videos.length,
        data: videos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  
  // @desc    Create new video
  // @route   POST /api/videos
  // @access  Private (Admin)
  const createVideo = async (req, res) => {
    try {
      const video = await Video.create(req.body);
  
      res.status(201).json({
        success: true,
        data: video,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to create video',
        error: error.message,
      });
    }
  };
  
  // @desc    Update video
  // @route   PUT /api/videos/:id
  // @access  Private (Admin)
  const updateVideo = async (req, res) => {
    try {
      const video = await Video.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
  
      if (!video) {
        return res.status(404).json({
          success: false,
          message: 'Video not found',
        });
      }
  
      res.json({
        success: true,
        data: video,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Failed to update video',
        error: error.message,
      });
    }
  };
  
  // @desc    Delete video
  // @route   DELETE /api/videos/:id
  // @access  Private (Admin)
  const deleteVideo = async (req, res) => {
    try {
      const video = await Video.findByIdAndDelete(req.params.id);
  
      if (!video) {
        return res.status(404).json({
          success: false,
          message: 'Video not found',
        });
      }
  
      res.json({
        success: true,
        message: 'Video deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message,
      });
    }
  };
  
  module.exports = {
    getAllVideos,
    getVideoById,
    getFeaturedVideo,
    getTrendingVideos,
    getVideosByGenre,
    searchVideos,
    createVideo,
    updateVideo,
    deleteVideo,
  };
  