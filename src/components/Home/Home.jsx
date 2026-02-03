// ============================================
// IMPORTS SECTION
// ============================================
import Trackard from "../reusable/trackCard.jsx";
import axios from "../../lib/axios.js";
import { useState, useEffect } from "react";
import { useAudio } from "../../context/AudioContext.jsx";
import TracksPopup from "../reusable/TracksPopup";
import Landing from "./Landing.jsx";
import { Routes, Route, Link } from "react-router-dom";
import Library from "../Library/Library.jsx";
import { toAbsolutePath } from "../../lib/utils.js";

// ============================================
// HOME COMPONENT - Main layout wrapper
// ============================================
const Home = () => {
  // ------------------------------------------
  // AUDIO CONTEXT - Destructure audio controls
  // ------------------------------------------
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

  // ------------------------------------------
  // STATE MANAGEMENT
  // ------------------------------------------
  let [suggestedTracks, setSuggestedTracks] = useState([]); // Suggested/playlist tracks
  let [recentTracks, setRecentTracks] = useState([]); // Recently played tracks
  let [artists, setArtists] = useState([]); // Top artists
  let [shuffleEnabled, setShuffleEnabled] = useState(false); // Shuffle mode toggle
  let [repeatEnabled, setRepeatEnabled] = useState("ALL"); // Repeat mode: OFF, ALL, ONE

  // ------------------------------------------
  // DATA FETCHING - Load initial data on mount
  // ------------------------------------------
  useEffect(() => {
    // Fetch suggested/playlist tracks
    axios
      .get("/api/tracks/playlist/") //playlist?id=Default&offset=0&limit=10"
      .then((response) => {
        console.log(response.data.data);
        setSuggestedTracks(response.data.data);
        initializeQueue(response.data.data);
      });

    // Fetch recently played tracks
    axios.get("api/tracks/recents").then((response) => {
      setRecentTracks(response.data.data);
    });

    // Fetch top artists
    axios.get("api/artists/top").then((response) => {
      setArtists(response.data.data);
    });
  }, []);

  // ------------------------------------------
  // POPUP STATE - Tracks popup visibility
  // ------------------------------------------
  const [showPopup, setShowPopup] = useState(false);

  // ============================================
  // RENDER SECTION
  // ============================================
  return (
    <div className="h-full w-full bg-slate-950 flex flex-col space-y-2 p-2 relative">
      {/* ========================================
          MAIN CONTENT AREA - Sidebar + Content
          ======================================== */}
      <div className=" h-[89%] w-full flex flex-row space-x-2 p-1">
        {/* ----------------------------------------
            SIDEBAR - Navigation & Current Track Art
            ---------------------------------------- */}
        <div className=" h-full w-2/12 bg-neutral-800 rounded-md relative p-3">
          {/* Navigation Links */}
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

          {/* Current Track Cover Art Display */}
          <div className=" h-44 w-[calc(100%-24px)] bottom-3 absolute">
            <img
              src={currentTrack ? toAbsolutePath(currentTrack.image) : null}
              alt="cover art"
              className="w-full h-full object-cover round-md"
            />
          </div>
        </div>

        {/* ----------------------------------------
            MAIN CONTENT AREA - Header + Routes
            ---------------------------------------- */}
        <div className="  h-full w-10/12 bg-neutral-900">
          {/* App Header/Branding */}
          <div className="w-full bg-sky-800 h-11 text-xl font-extrabold text-gray-50 p-1 pt-2 pl-3">
            <h1>ZXENON</h1>
          </div>

          {/* Dynamic Content Routes - Landing, Library, etc. */}
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
      {/* ========================================
          AUDIO PLAYER CONTROLS - Bottom Bar
          ======================================== */}
      <div className=" absolute bottom-1 bg-neutral-900 h-20  w-[calc(100%-18px)] rounded-md p-4 pt-2 pb-1 flex flex-col justify-between">
        {/* ----------------------------------------
            PROGRESS BAR - Track seek control
            ---------------------------------------- */}
        <div className="w-full flex items-center gap-2">
          {/* Current Time Display */}
          <span className="text-gray-400 text-xs">{`${Math.floor(currentTime / 60) ?? 0}:${Math.floor(currentTime % 60) ?? 0}`}</span>
          {/* Seek Slider */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime || 0}
            onChange={(e) => seek(Number(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg cursor-pointer accent-sky-500"
          />
          {/* Duration Display */}
          <span className="text-gray-400 text-xs">{`${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`}</span>
        </div>

        {/* ----------------------------------------
            NOW PLAYING INFO & CONTROLS ROW
            ---------------------------------------- */}
        <div className="w-full flex items-center justify-between mt-0 relative pr-2">
          {/* Track Info - Cover, Title, Artist, Favorite */}
          <div className="flex items-center gap-4 w-2/12 h-full flex-1 ">
            {/* Mini Cover Art */}
            <div className="w-10 h-10 rounded flex-shrink-0">
              <img
                src={currentTrack ? toAbsolutePath(currentTrack.image) : null}
                alt="cover art"
                className="w-full h-full object-cover round-md"
              />
            </div>
            {/* Track Title & Artist */}
            <div className="flex-1 min-w-0">
              <div className="text-gray-50 text-sm font-semibold truncate">
                {currentTrack ? currentTrack.title : ""}
              </div>
              <div className="text-gray-400 text-xs truncate">
                {currentTrack ? currentTrack.artist : ""}
              </div>
            </div>
            {/* Favorite/Like Button */}
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 rounded-full transition-colors duration-300 z-50">
              <i className="fa fa-heart"></i>
            </button>
          </div>

          {/* ----------------------------------------
              PLAYBACK CONTROLS - Center aligned
              Shuffle, Prev, Play/Pause, Next, Repeat
              ---------------------------------------- */}
          <div className="flex items-center h-full w-full absolute justify-center gap-6">
            {/* Shuffle Toggle Button */}
            <button
              onClick={() => {
                toggleShuffle();
                setShuffleEnabled(queueRef.current.shuffle);
              }}
              className={`${shuffleEnabled ? "text-sky-500" : "text-gray-400"} hover:text-gray-50 transition-colors`}
            >
              <i className="fa fa-shuffle text-lg"></i>
            </button>
            {/* Previous Track Button */}
            <button
              onClick={() => prev()}
              className="text-gray-400 hover:text-gray-50 transition-colors"
            >
              <i className="fa fa-step-backward text-lg"></i>
            </button>
            {/* Play/Pause Button */}
            <button
              onClick={isPlaying ? pause : resume}
              className="bg-sky-600 hover:bg-sky-500 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
            >
              <i
                className={`fa ${isPlaying ? "fa-pause" : "fa-play"} text-lg`}
              ></i>
            </button>
            {/* Next Track Button */}
            <button
              onClick={() => next()}
              className="text-gray-400 hover:text-gray-50 transition-colors"
            >
              <i className="fa fa-step-forward text-lg"></i>
            </button>
            {/* Repeat Mode Toggle Button */}
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

          {/* ----------------------------------------
              VOLUME & PLAYLIST CONTROLS - Right side
              ---------------------------------------- */}
          <div className="flex items-center gap-4 w-3/12 justify-end hover:cursor-pointer z-50">
            {/* Playlist/Queue Toggle Button */}
            <button
              onClick={() => {
                setShowPopup(true);
                console.log("popup opened");
              }}
              className="text-gray-400 hover:text-gray-50 transition-colors"
            >
              <i className="fa fa-list text-lg"></i>
            </button>
            {/* Volume Control Slider */}
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

      {/* ========================================
          TRACKS POPUP MODAL - Queue/Playlist view
          ======================================== */}
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
