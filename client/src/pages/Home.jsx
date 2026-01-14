import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';
import Modal from '../components/Modal';
import { mockData } from '../data/mockData';

function Home() {
  const [selectedContent, setSelectedContent] = useState(null);

  return (
    <>
      <HeroBanner featured={mockData.featured} />

      <div className="relative z-20 -mt-32 px-12 pb-12">
        {mockData.contentRows.map((row, idx) => (
          <ContentRow 
            key={idx}
            title={row.title}
            items={row.items}
            showProgress={row.title === "Continue Watching"}
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

export default Home;