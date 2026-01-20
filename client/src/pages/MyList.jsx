import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentRow from '../components/ContentRow';
import Modal from '../components/Modal';
import { userAPI } from '../services/API';
import { useAuth } from '../context/AuthContext';

function MyList() {
  const [selectedContent, setSelectedContent] = useState(null);
  const [myListItems, setMyListItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchMyList = async () => {
      try {
        setLoading(true);
        const response = await userAPI.getMyList();
        if (response.success) {
          setMyListItems(response.data);
        }
      } catch (err) {
        setError('Failed to load your list');
        console.error('Error fetching my list:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyList();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-white">Loading your list...</div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-32 px-12 pb-8">
        <h1 className="text-5xl font-bold mb-4">My List</h1>
        <p className="text-gray-400 text-lg">
          {myListItems.length} {myListItems.length === 1 ? 'title' : 'titles'} saved to your list
        </p>
      </div>

      {error && (
        <div className="px-12 mb-4">
          <div className="bg-red-600 text-white p-4 rounded">
            {error}
          </div>
        </div>
      )}

      {myListItems.length > 0 ? (
        <div className="px-12 pb-12">
          <ContentRow 
            title="Your Saved Content"
            items={myListItems}
            showProgress={false}
            onSelectContent={setSelectedContent}
          />
        </div>
      ) : (
        <div className="px-12 pb-12 flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-2xl text-gray-400 mb-4">Your list is empty</p>
          <p className="text-gray-500 mb-6">
            Add shows and movies to your list to watch them later
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-red-600 px-6 py-3 rounded hover:bg-red-700 transition"
          >
            Browse Content
          </button>
        </div>
      )}

      <Modal 
        content={selectedContent} 
        onClose={() => setSelectedContent(null)} 
      />
    </>
  );
}

export default MyList;