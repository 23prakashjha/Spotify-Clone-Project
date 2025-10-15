import React, { useContext } from "react";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {
  const { songsData, albumsData, playWithId } = useContext(PlayerContext);

  // Handle loading or empty state
  const isLoading =
    !songsData || !albumsData || (songsData.length === 0 && albumsData.length === 0);

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 mt-20">
        Loading music data...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* Featured Charts Section */}
      <section className="mb-10 px-4">
        <h1 className="my-5 font-bold text-2xl text-white">Featured Charts</h1>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 min-w-full pb-2">
            {albumsData.length > 0 ? (
              albumsData.map((item) => (
                <div key={item._id || item.id} className="flex-shrink-0 w-48">
                  <AlbumItem
                    id={item._id || item.id}
                    name={item.name}
                    desc={item.desc}
                    image={item.image}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 px-4">No albums available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Today's Biggest Hits Section */}
      <section className="mb-8 px-4">
        <h1 className="my-5 font-bold text-2xl text-white">Today's Biggest Hits</h1>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 min-w-full pb-2">
            {songsData.length > 0 ? (
              songsData.map((item) => (
                <div key={item._id} className="flex-shrink-0 w-48">
                  <SongItem
                    id={item._id}
                    name={item.name}
                    desc={item.desc}
                    image={item.image}
                    onClick={() => playWithId(item._id)} // ✅ Pass click handler
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-400 px-4">No songs available.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default DisplayHome;
