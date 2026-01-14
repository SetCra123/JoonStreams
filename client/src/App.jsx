// import React, { useState } from 'react';
// import Header from './components/Header';
// import HeroBanner from './components/HeroBanner';
// import ContentRow from './components/ContentRow';
// import Modal from './components/Modal';
// import { mockData } from './data/mockData';

// function App() {
//   const [selectedContent, setSelectedContent] = useState(null);

//   return (
//     <div className="bg-black min-h-screen text-white">
//       <Header />
      
//       <HeroBanner featured={mockData.featured} />

//       <div className="relative z-20 -mt-32 px-12 pb-12">
//         {mockData.contentRows.map((row, idx) => (
//           <ContentRow 
//             key={idx}
//             title={row.title}
//             items={row.items}
//             showProgress={row.title === "Continue Watching"}
//             onSelectContent={setSelectedContent}
//           />
//         ))}
//       </div>

//       <Modal 
//         content={selectedContent} 
//         onClose={() => setSelectedContent(null)} 
//       />
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Browse from './pages/Browse';
import MyList from './pages/MyList';
import TVShows from './pages/TVShows';

function App() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/movies" element={<Browse />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/my-list" element={<MyList />} />
      </Routes>
    </div>
  );
}

export default App;