import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets"; // Ensure this file exports default_cover

const AlbumItem = ({ image, name, desc, id, _id }) => {
  const navigate = useNavigate();

  // Use either id or _id (to support different data shapes)
  const albumId = id || _id;

  const handleClick = () => {
    if (albumId) {
      navigate(`/album/${albumId}`);
    } else {
      console.warn("No album ID provided to AlbumItem");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition"
    >
      <img
        className="rounded w-full h-[180px] object-cover"
        src={image || assets.default_cover || "/default_cover.png"}
        alt={name || "Album cover"}
      />
      <p className="font-bold mt-2 mb-1 truncate">{name || "Unknown Album"}</p>
      <p className="text-slate-200 text-sm truncate">{desc || "No description available"}</p>
    </div>
  );
};

export default AlbumItem;
