import Trackard from "../reusable/trackCard.jsx";
import axios from "../../lib/axios.js";
import { useState, useEffect } from "react";
import { useAudio } from "../../context/AudioContext.jsx";

const Home = () => {
  const {
    isPlaying,
    currentTrack,
    duration,
    pause,
    resume,
    seek,
    volume,
    toggleRepeat,
    setVolume,
  } = useAudio();

  let [suggestedTracks, setSuggestedTracks] = useState([]);
  let [recentTracks, setRecentTracks] = useState([]);
  let [artists, setArtists] = useState([]);
  useEffect(() => {
    axios.get("api/tracks/suggested").then((response) => {
      setSuggestedTracks(response.data.data);
    });
    axios.get("api/tracks/recents").then((response) => {
      setRecentTracks(response.data.data);
    });
    axios.get("api/artists/top").then((response) => {
      setArtists(response.data.data);
    });
  }, []);

  return (
    <div className="h-full w-full bg-slate-950 flex flex-col space-y-4 p-6 pb-2">
      <div className=" h-[86%] w-full flex flex-row space-x-4 p-1">
        <div className=" h-full w-2/12 bg-gray-900 rounded-md relative p-3">
          <div className="text-gray-50 text-xl pl-3">
            <div>
              <button className="transition-transform hover:scale-95 ease-linear duration-75">
                <i className="fa fa-house w-8 text-left"></i>Home
              </button>
            </div>
            <div>
              <button className="transition-transform hover:scale-95 ease-linear duration-75">
                <i id="fabars" className="fa fa-bars  w-8 text-left"></i>
                Library
              </button>
            </div>
            <div>
              <button className="transition-transform hover:scale-95 ease-linear duration-75">
                <i className="fa fa-search  w-8 text-left"></i>Search
              </button>
            </div>
          </div>

          <div className="border border-gray-200 h-44 w-[calc(100%-24px)] bottom-3 absolute"></div>
        </div>
        <div className="  h-full w-10/12 bg-gray-900 rounded-md">
          <div className="w-full bg-sky-800 h-14 text-2xl font-extrabold text-gray-50 p-3">
            <h1>ZXENON</h1>
          </div>
          {/*below are sections suggested tracks, lecent played, suggested playlist, artist*/}
          <div className="w-full h-[calc(100%-3.5rem)] overflow-y-scroll p-4">
            <div className="flex flex-row gap-5 overflow-x-scroll">
              {suggestedTracks.map((track) => {
                return (
                  <Trackard key={track.id} CardType="suggestion" {...track} />
                );
              })}
            </div>
            <div>
              <h1 className="text-xl text-gray-300 pb-4">Recent Plays {">"}</h1>
              <div className="flex flex-row gap-5 overflow-x-scroll">
                {recentTracks.map((track) => {
                  return (
                    <Trackard
                      key={track.track_id}
                      CardType="recent"
                      {...track}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              <h1 className="text-xl text-gray-300 pb-4">Artits {">"}</h1>
              <div className="flex flex-row gap-5 overflow-x-scroll">
                {artists.map((artist) => {
                  return (
                    <Trackard
                      key={artist.artist_id}
                      CardType="artist"
                      {...artist}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* audio player controls*/}
      <div className=" bg-gray-900 h-[14%] w-full rounded-md p-4  flex flex-col justify-between">
        {/* Progress bar */}
        <div className="w-full flex items-center gap-2">
          <span className="text-gray-400 text-xs">0:00</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTrack || 0}
            onChange={(e) => seek(Number(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg cursor-pointer accent-sky-500"
          />
          <span className="text-gray-400 text-xs">3:45</span>
        </div>

        {/* Now Playing Info */}
        <div className="w-full flex items-center justify-between mt-2 relative pr-2">
          <div className="flex items-center gap-4 w-2/12 h-full flex-1 ">
            <div className="w-12 h-12 bg-gray-800 rounded flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="text-gray-50 text-sm font-semibold truncate">
                Now Playing Track
              </div>
              <div className="text-gray-400 text-xs truncate">Artist Name</div>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center h-full w-full absolute justify-center gap-6">
            <button className="text-gray-400 hover:text-gray-50 transition-colors">
              <i className="fa fa-shuffle text-lg"></i>
            </button>
            <button className="text-gray-400 hover:text-gray-50 transition-colors">
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
            <button className="text-gray-400 hover:text-gray-50 transition-colors">
              <i className="fa fa-step-forward text-lg"></i>
            </button>
            <button
              onClick={() => toggleRepeat}
              className="text-gray-400 hover:text-gray-50 transition-colors"
            >
              <i className="fa fa-repeat text-lg"></i>
            </button>
          </div>

          {/* Volume and Playlist - Far Right */}
          <div className="flex items-center gap-4 w-3/12 justify-end">
            <button className="text-gray-400 hover:text-gray-50 transition-colors">
              <i className="fa fa-list text-lg"></i>
            </button>
            <div className="flex items-center gap-2  ">
              <i className="fa fa-volume-down text-gray-400 text-sm"></i>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  const newVol = Number(e.target.value);
                  console.log("Volume changed to:", newVol);
                  setVolume(newVol);
                }}
                className="w-20 h-4 z-50 bg-gray-700 rounded-lg accent-sky-500 cursor-pointer"
              />
              <i className="fa fa-volume-up text-gray-400 text-sm"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
