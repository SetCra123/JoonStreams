require('dotenv').config();
const mongoose = require('mongoose');
const Video = require('../models/Video');
const connectDB = require('../config/db');

const videos = [
  {
    title: "Midnight Chronicles",
    description: "A gripping thriller series that follows a detective's pursuit through the darkest corners of the city.",
    thumbnail: "https://images.unsplash.com/photo-1574267432644-f85f40724258?w=1920&h=1080&fit=crop",
    videoUrl: "https://example.com/videos/midnight-chronicles.mp4",
    duration: 120,
    genre: ["Thriller", "Drama"],
    rating: 8.5,
    releaseYear: 2024,
    type: "series",
    featured: true,
    trending: true,
    cast: ["John Doe", "Jane Smith", "Robert Johnson"],
    director: "Christopher Nolan",
  },
  {
    title: "Dark Waters",
    description: "An underwater adventure exploring the mysteries of the deep ocean.",
    thumbnail: "https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=225&fit=crop",
    videoUrl: "https://example.com/videos/dark-waters.mp4",
    duration: 95,
    genre: ["Action", "Adventure"],
    rating: 7.8,
    releaseYear: 2024,
    type: "movie",
    featured: false,
    trending: true,
    cast: ["Emma Stone", "Chris Hemsworth"],
    director: "James Cameron",
  },
  {
    title: "City Lights",
    description: "A romantic drama set in the bustling streets of New York City.",
    thumbnail: "https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=400&h=225&fit=crop",
    videoUrl: "https://example.com/videos/city-lights.mp4",
    duration: 105,
    genre: ["Romance", "Drama"],
    rating: 8.2,
    releaseYear: 2023,
    type: "movie",
    featured: false,
    trending: true,
    cast: ["Ryan Gosling", "Emma Watson"],
    director: "Damien Chazelle",
  },
  {
    title: "Mountain Peak",
    description: "An inspiring story of climbers conquering the world's highest peak.",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=225&fit=crop",
    videoUrl: "https://example.com/videos/mountain-peak.mp4",
    duration: 110,
    genre: ["Documentary", "Adventure"],
    rating: 8.0,
    releaseYear: 2024,
    type: "movie",
    featured: false,
    trending: false,
    cast: ["Tom Hardy", "Benedict Cumberbatch"],
    director: "Jimmy Chin",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing videos
    await Video.deleteMany({});
    console.log('Cleared existing videos');

    // Insert new videos
    await Video.insertMany(videos);
    console.log('Videos seeded successfully');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();