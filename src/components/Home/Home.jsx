import Trackard from "../reusable/trackCard.jsx";
import axios from "../../lib/axios.js";
import { useState, useEffect } from "react";
import { useAudio } from "../../context/AudioContext.jsx";
import TracksPopup from "../reusable/TracksPopup";
import Landing from "./Landing.jsx";
import { Routes, Route, Link } from "react-router-dom";
import Library from "../Library/Library.jsx";
import { toAbsolutePath } from "../../lib/utils.js";
const Home = () => {
  const {
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    pause,
    resume,
    seek,
    volume,
    toggleRepeat,
    toggleShuffle,
    setVolume,
    initializeQueue,
    next,
    prev,
    queueRef,
  } = useAudio();
  let [suggestedTracks, setSuggestedTracks] = useState([]);
  let [recentTracks, setRecentTracks] = useState([]);
  let [artists, setArtists] = useState([]);
  let [shuffleEnabled, setShuffleEnabled] = useState(false);
  let [repeatEnabled, setRepeatEnabled] = useState("ALL");

  useEffect(() => {
    axios
      .get("/api/tracks/playlist/") //playlist?id=Default&offset=0&limit=10"
      .then((response) => {
        console.log(response.data.data);
        setSuggestedTracks(response.data.data);
        initializeQueue(response.data.data);
      });
    axios.get("api/tracks/recents").then((response) => {
      setRecentTracks(response.data.data);
    });
    axios.get("api/artists/top").then((response) => {
      setArtists(response.data.data);
    });
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="h-full w-full bg-slate-950 flex flex-col space-y-4 p-6 pb-2">
      <div className=" h-[86%] w-full flex flex-row space-x-4 p-1">
        <div className=" h-full w-2/12 bg-neutral-800 rounded-md relative p-3">
          <div className="text-gray-50 text-xl pl-3">
            <div>
              <Link
                to="/"
                className="transition-transform hover:scale-95 ease-linear duration-75"
              >
                <i className="fa fa-house w-8 text-left"></i>Home
              </Link>
            </div>
            <div>
              <Link
                to="/library"
                className="transition-transform hover:scale-95 ease-linear duration-75"
              >
                <i id="fabars" className="fa fa-bars  w-8 text-left"></i>
                Library
              </Link>
            </div>
            <div>
              <Link
                to="/search"
                className="transition-transform hover:scale-95 ease-linear duration-75"
              >
                <i className="fa fa-search  w-8 text-left"></i>Search
              </Link>
            </div>
          </div>

          <div className=" h-44 w-[calc(100%-24px)] bottom-3 absolute">
            <img
              src={currentTrack ? toAbsolutePath(currentTrack.image) : null}
              alt="cover art"
              className="w-full h-full object-cover round-md"
            />
          </div>
        </div>
        <div className="  h-full w-10/12 bg-neutral-900 rounded-md">
          <div className="w-full bg-sky-800 h-14 text-2xl font-extrabold text-gray-50 p-3">
            <h1>ZXENON</h1>
          </div>
          {/*below are sections suggested tracks, lecent played, suggested playlist, artist*/}
          <Routes>
            <Route
              path="/"
              element={
                <Landing
                  properties={{ suggestedTracks, recentTracks, artists }}
                />
              }
            />
            <Route path="/library/*" element={<Library />} />
          </Routes>
        </div>
      </div>
      {/* audio player controls*/}
      <div className=" bg-neutral-900 h-[14%] w-full rounded-md p-4  flex flex-col justify-between">
        {/* Progress bar */}
        <div className="w-full flex items-center gap-2">
          <span className="text-gray-400 text-xs">{`${Math.floor(currentTime / 60) ?? 0}:${Math.floor(currentTime % 60) ?? 0}`}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime || 0}
            onChange={(e) => seek(Number(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg cursor-pointer accent-sky-500"
          />
          <span className="text-gray-400 text-xs">{`${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`}</span>
        </div>

        {/* Now Playing Info */}
        <div className="w-full flex items-center justify-between mt-2 relative pr-2">
          <div className="flex items-center gap-4 w-2/12 h-full flex-1 ">
            <div className="w-12 h-12 rounded flex-shrink-0">
              <img
                src={currentTrack ? toAbsolutePath(currentTrack.image) : null}
                alt="cover art"
                className="w-full h-full object-cover round-md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-50 text-sm font-semibold truncate">
                {currentTrack ? currentTrack.title : ""}
              </div>
              <div className="text-gray-400 text-xs truncate">
                {currentTrack ? currentTrack.artist : ""}
              </div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center h-full w-full absolute justify-center gap-6">
            <button
              onClick={() => {
                toggleShuffle();
                setShuffleEnabled(queueRef.current.shuffle);
              }}
              className={`${shuffleEnabled ? "text-sky-500" : "text-gray-400"} hover:text-gray-50 transition-colors`}
            >
              <i className="fa fa-shuffle text-lg"></i>
            </button>
            <button
              onClick={() => prev()}
              className="text-gray-400 hover:text-gray-50 transition-colors"
            >
              <i className="fa fa-step-backward text-lg"></i>
            </button>
            <button
              onClick={isPlaying ? pause : resume}
              className="bg-sky-600 hover:bg-sky-500 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              <i
                className={`fa ${isPlaying ? "fa-pause" : "fa-play"} text-lg`}
              ></i>
            </button>
            <button
              onClick={() => next()}
              className="text-gray-400 hover:text-gray-50 transition-colors"
            >
              <i className="fa fa-step-forward text-lg"></i>
            </button>
            <button
              onClick={() => {
                toggleRepeat();
                console.log(
                  "repeatenabled: ",
                  queueRef.current.repeat,
                  "mode: ",
                  queueRef.current.mode,
                );
                setRepeatEnabled(queueRef.current.repeat);
              }}
              className="text-gray-400 hover:text-gray-50 transition-colors"
            >
              <i
                className={`fa fa-repeat text-lg ${repeatEnabled === "OFF" ? "text-gray-400" : repeatEnabled === "ALL" ? "text-sky-500" : "text-sky-500 fa-solid fa-repeat-1"}`}
              >
                {repeatEnabled === "ONE" && <sub className="text-xs">1</sub>}
              </i>
            </button>
          </div>

          {/* Volume and Playlist - Far Right */}
          <div className="flex items-center gap-4 w-3/12 justify-end hover:cursor-pointer z-50">
            <button
              onClick={() => {
                setShowPopup(true);
                console.log("popup opened");
              }}
              className="text-gray-400 hover:text-gray-50 transition-colors"
            >
              <i className="fa fa-list text-lg"></i>
            </button>
            <div className="flex items-center gap-2">
              <i className="fa fa-volume-down text-gray-400 text-sm"></i>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  const newVol = Number(e.target.value);
                  setVolume(newVol);
                }}
                className="w-20 h-4 z-50 bg-gray-700 rounded-lg accent-sky-500 cursor-pointer"
              />
              <i className="fa fa-volume-up text-gray-400 text-sm"></i>
            </div>
          </div>
        </div>
      </div>
      <TracksPopup
        tracks={suggestedTracks}
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        title="Your Playlist"
      />
    </div>
  );
};

export default Home;
