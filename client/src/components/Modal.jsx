import React, { useState } from 'react';
import { Play, X, Plus, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/API';
import VideoPlayer from './VideoPlayer';

function Modal({ content, onClose }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const [isInList, setIsInList] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!content) return null;

  const handleAddToList = async () => {
    if (!isAuthenticated()) {
      alert('Please login to add to your list');
      return;
    }

    try {
      if (isInList) {
        await userAPI.removeFromMyList(content._id);
        setIsInList(false);
      } else {
        await userAPI.addToMyList(content._id);
        setIsInList(true);
      }
    } catch (error) {
      console.error('Error updating list:', error);
      alert(error.response?.data?.message || 'Failed to update list');
    }
  };

  const handlePlayClick = () => {
    setShowPlayer(true);
  };

  if (showPlayer) {
    return (
      <VideoPlayer
        videoUrl={content.videoUrl}
        title={content.title}
        onClose={() => {
          setShowPlayer(false);
          onClose();
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-8">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full overflow-hidden">
        <div className="relative">
          <img 
            src={content.thumbnail || content.image} 
            alt={content.title}
            className="w-full h-96 object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          >
            <X size={24} />
          </button>
          <div className="absolute bottom-8 left-8">
            <h2 className="text-4xl font-bold mb-4">{content.title}</h2>
            <div className="flex gap-3">
              <button 
                onClick={handlePlayClick}
                className="bg-white text-black px-8 py-3 rounded font-bold flex items-center gap-2 hover:bg-opacity-80"
              >
                <Play size={24} fill="black" />
                Play
              </button>
              {isAuthenticated() && (
                <button
                  onClick={handleAddToList}
                  className="bg-gray-700 bg-opacity-80 text-white px-6 py-3 rounded font-bold flex items-center gap-2 hover:bg-gray-600"
                >
                  {isInList ? <Check size={20} /> : <Plus size={20} />}
                  {isInList ? 'In My List' : 'Add to List'}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="p-8">
          <div className="flex gap-4 mb-4 text-sm">
            <span className="text-green-500 font-bold">{content.rating ? `${content.rating * 10}% Match` : '95% Match'}</span>
            <span>{content.releaseYear || '2024'}</span>
            <span className="border border-gray-500 px-2">HD</span>
          </div>
          <p className="text-gray-300 mb-6">
            {content.description || 'An epic tale of adventure and discovery. Follow our heroes as they embark on a journey that will change their lives forever.'}
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Cast:</span> {content.cast?.join(', ') || 'John Doe, Jane Smith, Robert Johnson'}
            </div>
            <div>
              <span className="text-gray-500">Genres:</span> {content.genre?.join(', ') || 'Action, Drama, Thriller'}
            </div>
            {content.director && (
              <div>
                <span className="text-gray-500">Director:</span> {content.director}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;