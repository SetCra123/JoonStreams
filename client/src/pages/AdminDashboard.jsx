import React, { useState } from 'react';
import { videoAPI } from '../services/API';

function AdminDashboard() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnail: '',
    videoUrl: '',
    duration: '',
    genre: [],
    rating: '',
    releaseYear: '',
    type: 'movie',
    featured: false,
    trending: false,
    cast: '',
    director: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Documentary', 'Animation'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGenreChange = (genre) => {
    setFormData({
      ...formData,
      genre: formData.genre.includes(genre)
        ? formData.genre.filter(g => g !== genre)
        : [...formData.genre, genre],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const videoData = {
        ...formData,
        duration: parseInt(formData.duration),
        rating: parseFloat(formData.rating),
        releaseYear: parseInt(formData.releaseYear),
        cast: formData.cast.split(',').map(c => c.trim()),
      };

      const response = await videoAPI.createVideo(videoData);

      if (response.success) {
        setMessage({ type: 'success', text: 'Video created successfully!' });
        // Reset form
        setFormData({
          title: '',
          description: '',
          thumbnail: '',
          videoUrl: '',
          duration: '',
          genre: [],
          rating: '',
          releaseYear: '',
          type: 'movie',
          featured: false,
          trending: false,
          cast: '',
          director: '',
        });
      }
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Failed to create video' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 px-12 pb-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      {message.text && (
        <div className={`p-4 rounded mb-6 ${message.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Director</label>
            <input
              type="text"
              name="director"
              value={formData.director}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Thumbnail URL *</label>
            <input
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Video URL *</label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Duration (min) *</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Rating (0-10) *</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Year *</label>
            <input
              type="number"
              name="releaseYear"
              value={formData.releaseYear}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none"
            >
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Genres *</label>
          <div className="grid grid-cols-3 gap-3">
            {genres.map(genre => (
              <label key={genre} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.genre.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="w-4 h-4"
                />
                <span className="text-gray-300">{genre}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Cast (comma-separated)</label>
          <input
            type="text"
            name="cast"
            value={formData.cast}
            onChange={handleChange}
            placeholder="Actor 1, Actor 2, Actor 3"
            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:border-red-600 focus:outline-none"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-gray-300">Featured</span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              name="trending"
              checked={formData.trending}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-gray-300">Trending</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded font-bold hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Video'}
        </button>
      </form>
    </div>
  );
}

export default AdminDashboard;