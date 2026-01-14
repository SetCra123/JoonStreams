import React from 'react';
import { Play, X } from 'lucide-react';

function Modal({ content, onClose }) {
  if (!content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-8">
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full overflow-hidden">
        <div className="relative">
          <img 
            src={content.image} 
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
            <button className="bg-white text-black px-8 py-3 rounded font-bold flex items-center gap-2 hover:bg-opacity-80">
              <Play size={24} fill="black" />
              Play
            </button>
          </div>
        </div>
        <div className="p-8">
          <div className="flex gap-4 mb-4 text-sm">
            <span className="text-green-500 font-bold">95% Match</span>
            <span>2024</span>
            <span className="border border-gray-500 px-2">HD</span>
          </div>
          <p className="text-gray-300 mb-6">
            An epic tale of adventure and discovery. Follow our heroes as they embark on a journey that will change their lives forever.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Cast:</span> John Doe, Jane Smith, Robert Johnson
            </div>
            <div>
              <span className="text-gray-500">Genres:</span> Action, Drama, Thriller
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;