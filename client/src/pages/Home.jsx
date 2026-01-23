import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import ContentRow from '../components/ContentRow';
import Modal from '../components/Modal';
import { videoAPI } from '../services/API';

function Home() {
  const [selectedContent, setSelectedContent] = useState(null);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [actionVideos, setActionVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch featured video
        const featuredData = await videoAPI.getFeaturedVideo();
        console.log('Featured video data:', featuredData);
        if (featuredData.success) {
          setFeaturedVideo(featuredData.data);
        }

        // Fetch trending videos
        const trendingData = await videoAPI.getTrendingVideos();
        console.log('Trending videos data:', trendingData);
        if (trendingData.success) {
          setTrendingVideos(trendingData.data);
        }

        // Fetch action videos
        const actionData = await videoAPI.getVideosByGenre('Action');
        console.log('Action videos data:', actionData);
        if (actionData.success) {
          setActionVideos(actionData.data);
        }

        // Optional: Fetch drama videos for variety
        const dramaData = await videoAPI.getVideosByGenre('Drama');
        console.log('Drama videos data:', dramaData);
        if (dramaData.success) {
          setContinueWatching(dramaData.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setError('Failed to load videos. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl text-white">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-2xl text-red-600 mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 px-6 py-3 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {featuredVideo && <HeroBanner featured={featuredVideo} />}

      <div className="relative z-20 -mt-32 px-12 pb-12">
        {trendingVideos.length > 0 && (
          <ContentRow 
            title="Trending Now"
            items={trendingVideos}
            showProgress={false}
            onSelectContent={setSelectedContent}
          />
        )}

        {continueWatching.length > 0 && (
          <ContentRow 
            title="Popular Dramas"
            items={continueWatching}
            showProgress={false}
            onSelectContent={setSelectedContent}
          />
        )}

        {actionVideos.length > 0 && (
          <ContentRow 
            title="Action & Adventure"
            items={actionVideos}
            showProgress={false}
            onSelectContent={setSelectedContent}
          />
        )}
      </div>

      <Modal 
        content={selectedContent} 
        onClose={() => setSelectedContent(null)} 
      />
    </>
  );
}

export default Home;


// import React from 'react';

// function Home() {
//   return (
//     <div className="pt-32 px-12 bg-black min-h-screen">
//       <h1 className="text-4xl font-bold mb-8 text-white">Test Horizontal Scroll</h1>
      
//       {/* Manual Test - No Components */}
//       <div className="mb-12">
//         <h2 className="text-2xl font-bold mb-4 text-white">Test Row (No Components)</h2>
//         <div className="flex gap-4 overflow-x-auto pb-4 bg-gray-900 p-4">
//           <div className="flex-shrink-0 w-72 h-40 bg-red-600 rounded">Card 1</div>
//           <div className="flex-shrink-0 w-72 h-40 bg-blue-600 rounded">Card 2</div>
//           <div className="flex-shrink-0 w-72 h-40 bg-green-600 rounded">Card 3</div>
//           <div className="flex-shrink-0 w-72 h-40 bg-yellow-600 rounded">Card 4</div>
//           <div className="flex-shrink-0 w-72 h-40 bg-purple-600 rounded">Card 5</div>
//           <div className="flex-shrink-0 w-72 h-40 bg-pink-600 rounded">Card 6</div>
//         </div>
//       </div>

//       {/* Test with actual fake data */}
//       <div className="mb-12">
//         <h2 className="text-2xl font-bold mb-4 text-white">Test with Fake Videos</h2>
//         <div className="flex gap-4 overflow-x-auto pb-4">
//           {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
//             <div 
//               key={num}
//               className="flex-shrink-0 w-72 cursor-pointer"
//             >
//               <img 
//                 src={`https://via.placeholder.com/400x225/ff0000/ffffff?text=Video+${num}`}
//                 alt={`Video ${num}`}
//                 className="w-full h-40 object-cover rounded"
//               />
//               <p className="text-white mt-2">Video Title {num}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;