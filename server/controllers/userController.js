const { User, Video } = require('../models');

// @desc    Add video to user's list
// @route   POST /api/users/my-list/:videoId
// @access  Private
const addToMyList = async (req, res) => {
  try {
    console.log('=== ADD TO MY LIST ===');
    console.log('req.user:', req.user);
    console.log('req.user._id:', req.user?._id);
    console.log('videoId:', req.params.videoId);

    const user = await User.findById(req.user._id);
    const videoId = req.params.videoId;

    console.log('Found user:', user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Check if video exists
    const video = await Video.findById(videoId);
    console.log('Found video:', video);

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

    console.log('✅ Video added successfully');

    res.json({
      success: true,
      message: 'Video added to your list',
      data: user.myList,
    });
  } catch (error) {
    console.error('❌ Error in addToMyList:', error);
    console.error('Error stack:', error.stack);
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
    console.log('=== REMOVE FROM MY LIST ===');
    console.log('req.user._id:', req.user?._id);
    console.log('videoId:', req.params.videoId);

    const user = await User.findById(req.user._id);
    const videoId = req.params.videoId;

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Remove from list
    user.myList = user.myList.filter(id => id.toString() !== videoId);
    await user.save();

    console.log('✅ Video removed successfully');

    res.json({
      success: true,
      message: 'Video removed from your list',
      data: user.myList,
    });
  } catch (error) {
    console.error('❌ Error in removeFromMyList:', error);
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
    console.log('=== GET MY LIST ===');
    console.log('req.user:', req.user);
    console.log('req.user._id:', req.user?._id);

    const user = await User.findById(req.user._id).populate('myList');
    
    console.log('Found user:', user);
    console.log('User myList:', user?.myList);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      count: user.myList.length,
      data: user.myList,
    });
  } catch (error) {
    console.error('❌ Error in getMyList:', error);
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
    console.log('=== UPDATE WATCH PROGRESS ===');
    console.log('req.user._id:', req.user?._id);
    console.log('videoId:', req.params.videoId);
    console.log('progress:', req.body.progress);

    const user = await User.findById(req.user._id);
    const videoId = req.params.videoId;
    const { progress } = req.body; // 0-100

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

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

    console.log('✅ Watch progress updated');

    res.json({
      success: true,
      message: 'Watch progress updated',
    });
  } catch (error) {
    console.error('❌ Error in updateWatchProgress:', error);
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
    console.log('=== GET WATCH HISTORY ===');
    console.log('req.user._id:', req.user?._id);

    const user = await User.findById(req.user._id).populate('watchHistory.video');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    console.log('Watch history count:', user.watchHistory.length);

    res.json({
      success: true,
      count: user.watchHistory.length,
      data: user.watchHistory,
    });
  } catch (error) {
    console.error('❌ Error in getWatchHistory:', error);
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