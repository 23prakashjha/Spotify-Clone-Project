import React, { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const audioRef = useRef(null);
  const seekBg = useRef(null);
  const seekBar = useRef(null);

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const url = "https://spotify-clone-project-mk50.onrender.com"

  // Fetch songs
  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      const songs = response.data.songs || [];
      setSongsData(songs);
      if (songs.length > 0) {
        setTrack(songs[0]);
        setTrackIndex(0);
      }
    } catch (err) {
      console.error("Failed to fetch songs:", err);
    }
  };

  // Fetch albums
  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      const albums = response.data.albums || [];
      setAlbumsData(albums);
    } catch (err) {
      console.error("Failed to fetch albums:", err);
    }
  };

  // Time & progress update
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!audio.duration) return;

      const current = audio.currentTime;
      const duration = audio.duration;

      if (seekBar.current) {
        seekBar.current.style.width = `${(current / duration) * 100}%`;
      }

      setTime({
        currentTime: {
          second: Math.floor(current % 60),
          minute: Math.floor(current / 60),
        },
        totalTime: {
          second: Math.floor(duration % 60),
          minute: Math.floor(duration / 60),
        },
      });
    };

    audio.ontimeupdate = updateTime;
    return () => (audio.ontimeupdate = null);
  }, []);

  // Load songs & albums on mount
  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  // Autoplay on track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    audio.src = track.file || track.audio; // ensure this matches your data
    if (playStatus) {
      audio.play().catch(() => {});
    }
  }, [track]);

  // Controls
  const play = () => {
    audioRef.current?.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setPlayStatus(false);
  };

  // ✅ Corrected playWithId to accept _id instead of index
  const playWithId = (id) => {
    const songIndex = songsData.findIndex(
      (song) => String(song._id) === String(id)
    );
    if (songIndex !== -1) {
      setTrack(songsData[songIndex]);
      setTrackIndex(songIndex);
      setPlayStatus(true);
    }
  };

  const previous = () => {
    if (trackIndex > 0) {
      const newIndex = trackIndex - 1;
      setTrack(songsData[newIndex]);
      setTrackIndex(newIndex);
      setPlayStatus(true);
    }
  };

  const next = () => {
    if (trackIndex < songsData.length - 1) {
      const newIndex = trackIndex + 1;
      setTrack(songsData[newIndex]);
      setTrackIndex(newIndex);
      setPlayStatus(true);
    }
  };

  const seekSong = (e) => {
    if (!audioRef.current || !seekBg.current) return;

    const rect = seekBg.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const duration = audioRef.current.duration;
    audioRef.current.currentTime = (clickX / width) * duration;
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        seekBg,
        seekBar,
        songsData,
        albumsData,
        track,
        trackIndex,
        playStatus,
        time,
        play,
        pause,
        playWithId,
        previous,
        next,
        seekSong,
      }}
    >
      {children}
      <audio ref={audioRef} preload="metadata" />
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;


