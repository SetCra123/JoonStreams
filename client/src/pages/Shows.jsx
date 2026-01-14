import React, { useState } from 'react';
import ContentRow from '../components/ContentRow';
import Modal from '../components/Modal';
import { mockData } from '../data/mockData';

function TVShows() {
  const [selectedContent, setSelectedContent] = useState(null);

  const tvCategories = [
    {
      title: "Trending TV Shows",
      items: mockData.contentRows[0].items
    },
    {
      title: "Drama Series",
      items: mockData.contentRows[2].items
    },
    {
      title: "Comedy Series",
      items: mockData.contentRows[1].items
    }
  ];

  return (
    <>
      {/* Page Header */}
      <div className="pt-32 px-12 pb-8">
        <h1 className="text-5xl font-bold mb-4">TV Shows</h1>
        <p className="text-gray-400 text-lg">
          Binge-worthy series and exclusive originals
        </p>
      </div>

      {/* Content Rows */}
      <div className="px-12 pb-12">
        {tvCategories.map((category, idx) => (
          <ContentRow 
            key={idx}
            title={category.title}
            items={category.items}
            showProgress={false}
            onSelectContent={setSelectedContent}
          />
        ))}
      </div>

      <Modal 
        content={selectedContent} 
        onClose={() => setSelectedContent(null)} 
      />
    </>
  );
}

export default TVShows;