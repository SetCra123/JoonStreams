const mongoose = require('mongoose');
const { Schema } = mongoose; 

const videoSchema = new Schema (
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    thumbnail: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    genre: {
      type: [String],
      required: true,
      enum: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation', 'Adventure'],
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['movie', 'series'],
      default: 'movie',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    trending: {
      type: Boolean,
      default: false,
    },
    cast: [{
      type: String,
    }],
    director: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Index for faster queries
videoSchema.index({ title: 'text', description: 'text' });
videoSchema.index({ genre: 1 });
videoSchema.index({ trending: 1, featured: 1 });

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;