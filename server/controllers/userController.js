const { User, Video } = require('../models');

// @desc    Add video to user's list
// @route   POST /api/users/my-list/:videoId
// @access  Private
const addToMyList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const videoId = req.params.videoId;

    // Check if video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    // Check if already in list
    if (user.myList.includes(videoId)) {
      return res.status(400).json({
        success: false,
        message: 'Video already in your list',
      });
    }

    // Add to list
    user.myList.push(videoId);
    await user.save();

    res.json({
      success: true,
      message: 'Video added to your list',
      data: user.myList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding to list',
      error: error.message,
    });
  }
};

// @desc    Remove video from user's list
// @route   DELETE /api/users/my-list/:videoId
// @access  Private
const removeFromMyList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const videoId = req.params.videoId;

    // Remove from list
    user.myList = user.myList.filter(id => id.toString() !== videoId);
    await user.save();

    res.json({
      success: true,
      message: 'Video removed from your list',
      data: user.myList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error removing from list',
      error: error.message,
    });
  }
};

// @desc    Get user's list
// @route   GET /api/users/my-list
// @access  Private
const getMyList = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('myList');

    res.json({
      success: true,
      count: user.myList.length,
      data: user.myList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting list',
      error: error.message,
    });
  }
};

// @desc    Update watch progress
// @route   PUT /api/users/watch-history/:videoId
// @access  Private
const updateWatchProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const videoId = req.params.videoId;
    const { progress } = req.body; // 0-100

    // Check if video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found',
      });
    }

    // Find existing watch history entry
    const existingEntry = user.watchHistory.find(
      entry => entry.video.toString() === videoId
    );

    if (existingEntry) {
      // Update existing entry
      existingEntry.progress = progress;
      existingEntry.watchedAt = Date.now();
    } else {
      // Add new entry
      user.watchHistory.push({
        video: videoId,
        progress,
        watchedAt: Date.now(),
      });
    }

    await user.save();

    res.json({
      success: true,
      message: 'Watch progress updated',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating watch progress',
      error: error.message,
    });
  }
};

// @desc    Get watch history
// @route   GET /api/users/watch-history
// @access  Private
const getWatchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('watchHistory.video');

    res.json({
      success: true,
      count: user.watchHistory.length,
      data: user.watchHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting watch history',
      error: error.message,
    });
  }
};

module.exports = {
  addToMyList,
  removeFromMyList,
  getMyList,
  updateWatchProgress,
  getWatchHistory,
};