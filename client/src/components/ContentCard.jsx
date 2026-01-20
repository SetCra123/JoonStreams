import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/API';

function ContentCard({ item, showProgress, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isInList, setIsInList] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleAddToList = async (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      alert('Please login to add to your list');
      return;
    }

    try {
      if (isInList) {
        await userAPI.removeFromMyList(item._id);
        setIsInList(false);
      } else {
        await userAPI.addToMyList(item._id);
        setIsInList(true);
      }
    } catch (error) {
      console.error('Error updating list:', error);
      alert('Failed to update list');
    }
  };

  return (
    <div 
      className="relative flex-shrink-0 w-72 cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(item)}
    >
      <img 
        src={item.thumbnail || item.image} 
        alt={item.title}
        className="w-full h-40 object-cover rounded"
      />
      {showProgress && item.progress && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700 rounded-b">
          <div 
            className="h-full bg-red-600" 
            style={{ width: `${item.progress}%` }}
          />
        </div>
      )}
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-80 rounded flex flex-col justify-end p-4 transition-opacity duration-300">
          <h3 className="text-white font-bold mb-2">{item.title}</h3>
          <div className="flex gap-2">
            <button className="bg-white text-black rounded-full p-2 hover:bg-opacity-80">
              <Play size={16} fill="black" />
            </button>
            {isAuthenticated() && (
              <button 
                onClick={handleAddToList}
                className="bg-gray-700 bg-opacity-80 text-white rounded-full p-2 hover:bg-gray-600"
              >
                {isInList ? <Check size={16} /> : <Plus size={16} />}
              </button>
            )}
            <button className="bg-gray-700 bg-opacity-80 text-white rounded-full p-2 hover:bg-gray-600">
              <ThumbsUp size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentCard;