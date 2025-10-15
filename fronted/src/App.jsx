import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext"; // ✅ Correct import

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext); // ✅ Correct variable names

  return (
    <div className="h-screen bg-black text-white">
      {songsData && songsData.length > 0 ? (
        <>
          {/* Main layout */}
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>

          {/* Bottom Player */}
          <Player />
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          Loading songs...
        </div>
      )}
    </div>
  );
};

export default App;
