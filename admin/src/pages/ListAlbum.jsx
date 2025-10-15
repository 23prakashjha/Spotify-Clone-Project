import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const url = import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ Replace with your backend base URL

  // ✅ Fetch albums
  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);

      if (response.data.success) {
        setData(response.data.albums);
      } else {
        toast.error("Failed to fetch albums");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while fetching albums");
    }
  };

  // ✅ Delete album
  const removeAlbum = async (id) => {
    try {
      const response = await axios.post(`${url}/api/album/remove`, { id });

      if (response.data.success) {
        toast.success(response.data.message || "Album removed successfully!");
        setData((prev) => prev.filter((album) => album._id !== id));
      } else {
        toast.error("Failed to remove album");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred while removing album");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []); // ✅ Prevent infinite re-fetch

  return (
    <div className="p-4">
      <p className="text-lg font-semibold mb-3">All Albums List</p>

      <div>
        {/* ✅ Table Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100 font-semibold">
          <p>Image</p>
          <p>Name</p>
          <p>Description</p>
          <p>Album Colour</p>
          <p>Action</p>
        </div>

        {/* ✅ Table Body */}
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm hover:bg-gray-50 transition"
            >
              <img
                className="w-12 h-12 object-cover rounded"
                src={item.image}
                alt={item.name}
              />
              <p className="truncate">{item.name}</p>
              <p className="truncate">{item.desc}</p>
              <input
                type="color"
                value={item.bgColour}
                disabled
                className="w-10 h-6 border-none"
              />
              <p
                className="cursor-pointer text-red-500 font-bold hover:text-red-700"
                onClick={() => removeAlbum(item._id)}
              >
                X
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No albums found.</p>
        )}
      </div>
    </div>
  );
};

export default ListAlbum;
