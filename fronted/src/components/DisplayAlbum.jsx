import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = () => {
  const { id } = useParams();
  const { albumsData, songsData, playWithId } = useContext(PlayerContext);

  if (!albumsData || !songsData) {
    return <div className="text-center text-gray-400 mt-20">Loading album details...</div>;
  }

  const albumData = albumsData.find((album) => String(album._id) === String(id));

  if (!albumData) {
    return <div className="text-center text-gray-400 mt-20">Album not found.</div>;
  }

  // ✅ Correct album song filter
  const albumSongs = songsData.filter((song) => {
    if (!song) return false;

    // First try ID
    if (song.albumId && String(song.albumId) === String(albumData._id)) return true;
    if (song.album && song.album._id && String(song.album._id) === String(albumData._id)) return true;

    // Fallback: match by album name
    if (song.album && typeof song.album === "string" && song.album === albumData.name) return true;
    if (song.albumName && song.albumName === albumData.name) return true;

    return false;
  });

  return (
    <>
      <Navbar />

      {/* Album Header */}
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img
          className="w-48 h-48 object-cover rounded"
          src={albumData.image || assets.default_cover}
          alt={albumData.name || "Album cover"}
        />
        <div className="flex flex-col">
          <p className="text-gray-300 text-sm">Playlist</p>
          <h2 className="text-5xl font-bold mb-2 md:text-7xl">{albumData.name}</h2>
          <p className="text-gray-400 mb-2">{albumData.desc || ""}</p>
          <p className="mt-1 text-gray-400">
            <img className="inline-block w-5 mr-1 align-middle" src={assets.spotify_logo} alt="Spotify" />
            <b>Spotify</b> • {albumSongs.length} songs
          </p>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] font-semibold">
        <p><b className="mr-4">#</b>Title</p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="Clock" />
      </div>
      <hr className="border-gray-700" />

      {/* Song List */}
      {albumSongs.length > 0 ? (
        albumSongs.map((song, index) => (
          <div
            key={song._id || index}
            onClick={() => playWithId(song._id)}
            className="grid grid-cols-3 sm:grid-cols-4 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer rounded transition"
          >
            <p className="text-white flex items-center">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img
                className="inline w-10 h-10 mr-5 rounded object-cover"
                src={song.image || assets.default_cover}
                alt={song.name || "Song cover"}
              />
              {song.name || "Unknown Song"}
            </p>
            <p className="text-[15px] truncate">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">Recently added</p>
            <p className="text-[15px] text-center">{song.duration || "0:00"}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400 mt-6 text-center">No songs found in this album.</p>
      )}
    </>
  );
};

export default DisplayAlbum;

