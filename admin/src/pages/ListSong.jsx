import React, { useEffect, useState } from "react";
import axios from "axios";

const ListSong = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = import.meta.env.VITE_API_URL || "https://spotify-clone-project-dkiv.vercel.app/"; // ✅ base URL

  // ✅ Fetch all songs
  const fetchSongs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/api/song/list`);

      if (Array.isArray(response.data)) {
        setSongs(response.data);
      } else if (Array.isArray(response.data.songs)) {
        setSongs(response.data.songs);
      } else {
        setSongs([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load songs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  // ✅ Delete a song
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;

    try {
      const response = await axios.post(`${url}/api/song/remove`, { id });

      if (response.data.success) {
        alert("Song deleted successfully!");
        setSongs((prev) => prev.filter((song) => song._id !== id));
      } else {
        alert("Failed to delete song.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred while deleting song.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        🎵 All Songs List
      </h2>

      {/* Loading / Error States */}
      {loading && <p className="text-center">Loading songs...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && songs.length === 0 && (
        <p className="text-center text-gray-600">No songs found.</p>
      )}

      {/* ✅ Song List Table */}
      {!loading && songs.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Album</th>
                <th className="py-3 px-4 text-left">Duration</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song) => (
                <tr
                  key={song._id}
                  className="border-b hover:bg-gray-100 transition duration-150"
                >
                  <td className="py-2 px-4">
                    <img
                      src={song.image || "https://via.placeholder.com/60"}
                      alt={song.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="py-2 px-4">{song.name}</td>
                  <td className="py-2 px-4">{song.album || "N/A"}</td>
                  <td className="py-2 px-4">{song.duration || "0:00"}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(song._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListSong;
