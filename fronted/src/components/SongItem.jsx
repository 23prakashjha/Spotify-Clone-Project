import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets"; // ✅ Make sure you have default_cover here

const SongItem = ({ image, name, desc, id }) => {
  const { playWithId } = useContext(PlayerContext);

  const handlePlay = () => {
    if (!id) {
      console.warn("No song ID provided to SongItem");
      return;
    }
    if (playWithId) {
      playWithId(id);
    } else {
      console.warn("playWithId function not available in PlayerContext");
    }
  };

  return (
    <div
      onClick={handlePlay}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition"
    >
      <img
        className="rounded w-full h-[180px] object-cover"
        src={image || assets.default_cover || "/default_cover.png"}
        alt={name || "Song cover"}
      />
      <p className="font-bold mt-2 mb-1 truncate">{name || "Unknown Song"}</p>
      <p className="text-slate-200 text-sm truncate">
        {desc || "No description available"}
      </p>
    </div>
  );
};

export default SongItem;
