import React, { useContext, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext); // ✅ use only from context
  const displayRef = useRef(null);
  const location = useLocation();

  // Detect album route and ID
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : null;

  // Find album safely
  const currentAlbum =
    isAlbum && albumsData?.length
      ? albumsData.find((album) => album._id === albumId)
      : null;

  const bgColor = currentAlbum?.bgColour || "#121212";

  // Update background when route or album changes
  useEffect(() => {
    if (!displayRef.current) return;
    displayRef.current.style.background = isAlbum
      ? `linear-gradient(${bgColor}, #121212)`
      : "#121212";
  }, [isAlbum, bgColor]);

  return (
    <div
      ref={displayRef}
      className="w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        {/** ✅ Pass album safely if found */}
        <Route
          path="/album/:id"
          element={<DisplayAlbum album={currentAlbum} />}
        />
      </Routes>
    </div>
  );
};

export default Display;
