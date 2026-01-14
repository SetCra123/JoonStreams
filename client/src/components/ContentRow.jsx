import React from 'react';
import ContentCard from './ContentCard';

function ContentRow({ title, items, showProgress, onSelectContent }) {
  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map(item => (
          <ContentCard 
            key={item.id} 
            item={item} 
            showProgress={showProgress}
            onSelect={onSelectContent}
          />
        ))}
      </div>
    </div>
  );
}

export default ContentRow;