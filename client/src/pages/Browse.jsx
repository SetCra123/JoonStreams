import React, { useState } from 'react';
import ContentRow from '../components/ContentRow';
import Modal from '../components/Modal';
import { mockData } from '../data/mockData';

function Browse() {
  const [selectedContent, setSelectedContent] = useState(null);

  const browseCategories = [
    {
      title: "New Releases",
      items: mockData.contentRows[0].items
    },
    {
      title: "Popular This Week",
      items: mockData.contentRows[2].items
    },
    {
      title: "Coming Soon",
      items: mockData.contentRows[1].items
    }
  ];

  return (
    <>
      {/* Page Header */}
      <div className="pt-32 px-12 pb-8">
        <h1 className="text-5xl font-bold mb-4">New & Popular</h1>
        <p className="text-gray-400 text-lg">
          Discover the latest releases and trending content
        </p>
      </div>

      {/* Content Rows */}
      <div className="px-12 pb-12">
        {browseCategories.map((category, idx) => (
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

export default Browse;