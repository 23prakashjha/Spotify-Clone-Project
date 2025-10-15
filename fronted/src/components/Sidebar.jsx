import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Correct import
import { assets } from '../assets/assets';

const Sidebar = () => {
  const navigate = useNavigate(); // ✅ Fixed spelling

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex bg-black">
      {/* Top Menu */}
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around">
        <div onClick={() => navigate('/')} className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.home_icon} alt="home" />
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer">
          <img className="w-6" src={assets.search_icon} alt="search" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      {/* Library Section */}
      <div className="bg-[#121212] h-[85%] rounded overflow-auto">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="library" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="arrow" />
            <img className="w-5" src={assets.plus_icon} alt="plus" />
          </div>
        </div>

        {/* Playlist & Podcast Sections */}
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4">
          <h1>Create your first playlist</h1>
          <p className="font-light">It's easy, we’ll help you</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer">
            Create Playlist
          </button>
        </div>

        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
          <h1>Let’s find some podcasts to follow</h1>
          <p className="font-light">We'll keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 cursor-pointer">
            Browse Podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
