import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seeksong,
  } = useContext(PlayerContext);

  // Helper: safely format time like "02:05"
  const formatTime = (minute = 0, second = 0) => {
    const m = minute < 10 ? `0${minute}` : minute;
    const s = second < 10 ? `0${second}` : second;
    return `${m}:${s}`;
  };

  // Show nothing if no track is selected yet
  if (!track) return null;

  return (
    <div className="h-[10%] min-h-[80px] bg-black flex justify-between items-center text-white px-4">
      {/* Left: Track Info */}
      <div className="hidden lg:flex items-center gap-4">
        <img
          className="w-14 h-14 object-cover rounded"
          src={track.image || assets.default_cover}
          alt={track.name || "Current track"}
        />
        <div className="leading-tight">
          <p className="font-medium truncate max-w-[200px]">{track.name || "Unknown Track"}</p>
          <p className="text-sm text-gray-400 truncate max-w-[200px]">
            {track.desc || "No description"}
          </p>
        </div>
      </div>

      {/* Center: Playback Controls */}
      <div className="flex flex-col items-center gap-1 m-auto">
        {/* Main Buttons */}
        <div className="flex gap-5 items-center">
          <img
            className="w-4 cursor-pointer hover:opacity-80"
            src={assets.shuffle_icon}
            alt="Shuffle"
          />
          <img
            onClick={previous}
            className="w-4 cursor-pointer hover:opacity-80"
            src={assets.prev_icon}
            alt="Previous"
          />

          {playStatus ? (
            <img
              onClick={pause}
              className="w-6 cursor-pointer hover:opacity-80"
              src={assets.pause_icon}
              alt="Pause"
            />
          ) : (
            <img
              onClick={play}
              className="w-6 cursor-pointer hover:opacity-80"
              src={assets.play_icon}
              alt="Play"
            />
          )}

          <img
            onClick={next}
            className="w-4 cursor-pointer hover:opacity-80"
            src={assets.next_icon}
            alt="Next"
          />
          <img
            className="w-4 cursor-pointer hover:opacity-80"
            src={assets.loop_icon}
            alt="Repeat"
          />
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 text-sm">
          <p>
            {formatTime(
              time?.currentTime?.minute ?? 0,
              time?.currentTime?.second ?? 0
            )}
          </p>

          <div
            onClick={seeksong}
            ref={seekBg}
            className="w-[60vw] max-w-[500px] bg-gray-600 h-1 rounded-full cursor-pointer relative"
          >
            <div
              ref={seekBar}
              className="absolute top-0 left-0 h-1 bg-green-500 rounded-full transition-all"
              style={{ width: "0%" }}
            ></div>
          </div>

          <p>
            {formatTime(
              time?.totalTime?.minute ?? 0,
              time?.totalTime?.second ?? 0
            )}
          </p>
        </div>
      </div>

      {/* Right: Extra Controls */}
      <div className="hidden lg:flex items-center gap-2 opacity-80">
        <img className="w-4" src={assets.queue_icon} alt="Queue" />
        <img className="w-4" src={assets.mic_icon} alt="Lyrics/Mic" />
        <img className="w-4" src={assets.speaker_icon} alt="Speaker output" />
        <img className="w-4" src={assets.volume_icon} alt="Volume" />
        <div className="w-20 bg-slate-500 h-1 rounded"></div>
        <img className="w-4" src={assets.mini_player_icon} alt="Mini player" />
        <img className="w-4" src={assets.zoom_icon} alt="Fullscreen" />
      </div>
    </div>
  );
};

export default Player;
