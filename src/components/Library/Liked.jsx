import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import { useAudio } from "../../context/AudioContext.jsx";
import { toAbsolutePath } from "../../lib/utils.js";

function Liked() {
  let { play } = useAudio();
  let [tracks, setTracks] = useState([]);
  useEffect(() => {
    axios
      .get("/api/library/playlist/liked")
      .then((res) => {
        setTracks(res.data.data);
      })
      .catch((err) => console.error("error fetching liked songs ", err));
  }, []);
  return (
    <div className="w-full flex-col space-y-2 p-3">
      <div className="h-28 p-1 text-white-300 text-xl w-full space-y-0 ">
        {tracks[0]?.image ? (
          <img
            src={toAbsolutePath(tracks[0].image)}
            alt="Liked Songs"
            className="h-full w-28 float-left mr-4 object-cover"
          />
        ) : (
          ""
        )}

        <div className="font-bold text-gray-200 h-full relative w-48 mt-0">
          Liked Songs
          <span className="text-xs font-normal text-gray-400 block">
            Total songs: {tracks.length}
          </span>
          <span className="text-xs font-normal text-gray-400 block">
            Total duration: 1 hr 15 min
          </span>
          <button
            onClick={() => {
              play(tracks[0]);
            }}
            className="absolute flex justify-center items-center active:bg-slate-400 w-10 h-10  bottom-0 bg-gray-200 text-xl text-black rounded-full hover:bg-gray-300 hover:scale-95 transition-colors duration-300"
          >
            <i className="fas fa-play"></i>
          </button>
        </div>
      </div>
      {/* Header */}
      <div className="w-full mb-0 border-b font-bold border-gray-700 flex flex-row text-gray-400 text-sm py-2">
        <div className="w-1/12 text-center">#</div>
        <div className="flex-1 w-3/12 px-2">Title</div>
        <div className="w-3/12 px-2">Artist</div>
        <div className="w-3/12 px-2">Album</div>
        <div className="w-2/12 px-2 text-right">Duration</div>
      </div>

      {/* Track List */}
      <div className="flex flex-col">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="w-full flex flex-row text-gray-200 text-sm   cursor-pointer "
          >
            <div className="w-1/12 text-center text-gray-400 p-2">
              {index + 1}
            </div>
            <div
              className="flex-1 w-3/12  hover:bg-gray-800 rounded-sm p-2"
              onClick={() => {
                play(track);
                console.log("playing track", track);
              }}
            >
              <img
                src={toAbsolutePath(track.image)}
                alt="Liked Songs"
                className="h-4 w-4 float-left mr-4 object-cover"
              />{" "}
              <span className="hover:underline">{track.title}</span>
            </div>
            <div className="w-3/12  text-gray-400 hover:bg-gray-800 rounded-sm p-2">
              <span className="hover:underline">{track.artist}</span>
            </div>

            <div className="w-4/12  text-gray-400 hover:bg-gray-800 rounded-sm p-2">
              <span className="hover:underline">{track.album}</span>
            </div>
            <div className="w-1/12  text-right text-gray-400 p-2">
              {track.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Liked;
