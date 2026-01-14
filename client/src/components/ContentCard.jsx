import React, { useState } from 'react';
import { Play, Plus, ThumbsUp } from 'lucide-react';

function ContentCard({ item, showProgress, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex-shrink-0 w-72 cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(item)}
    >
      <img 
        src={item.image} 
        alt={item.title}
        className="w-full h-40 object-cover rounded"
      />
      {showProgress && (
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
            <button className="bg-gray-700 bg-opacity-80 text-white rounded-full p-2 hover:bg-gray-600">
              <Plus size={16} />
            </button>
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