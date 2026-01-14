import React, { useState } from 'react';
import ContentRow from '../components/ContentRow';
import Modal from '../components/Modal';
import { mockData } from '../data/mockData';

function MyList() {
  const [selectedContent, setSelectedContent] = useState(null);
  
  // In a real app, this would come from user's saved list
  const myListItems = mockData.contentRows[1].items.slice(0, 4);

  return (
    <>
      {/* Page Header */}
      <div className="pt-32 px-12 pb-8">
        <h1 className="text-5xl font-bold mb-4">My List</h1>
        <p className="text-gray-400 text-lg">
          {myListItems.length} titles saved to your list
        </p>
      </div>

      {/* Content */}
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
          <p className="text-gray-500">
            Add shows and movies to your list to watch them later
          </p>
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