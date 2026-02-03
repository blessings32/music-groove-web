import { Routes, Route, Link } from "react-router-dom";
import Liked from "./Liked";
import ArtistProfile from "../ArtistProfile/ArtistProfile";

function Library() {
  return (
    <div className="w-full h-[calc(100%-3.5rem)] overflow-y-scroll p-4 pt-3 pr-0 pl-0">
      <div className="w-3/5 flex flex-row space-x-3 text-sm">
        <Link
          to="/library/liked"
          className="w-24 p-1 ml-2 border-gray-400 border rounded-sm  flex items-center justify-center text-gray-200 hover:bg-gray-300 hover:text-black transition-colors duration-150 ease-in-out"
        >
          <i className="fa fa-heart text-sky-600 text-sm mr-1"></i>{" "}
          <span> Liked</span>
        </Link>
        <Link
          to="/library/playlists"
          className="w-24 p-1 border-gray-400 border rounded-sm  flex items-center justify-center text-gray-200 hover:bg-gray-300 hover:text-black transition-colors duration-150 ease-in-out"
        >
          Playlists
        </Link>
        <Link
          to="/library/artists"
          className="w-24 p-1 border-gray-400 border rounded-sm  flex items-center justify-center text-gray-200 hover:bg-gray-300 hover:text-black transition-colors duration-150 ease-in-out"
        >
          Artists
        </Link>
        <Link
          to="/library/albums"
          className="w-24 p-1 border-gray-400 border rounded-sm  flex items-center justify-center text-gray-200 hover:bg-gray-300 hover:text-black transition-colors duration-150 ease-in-out"
        >
          Albums
        </Link>
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/liked" element={<Liked />} />
          <Route
            path="/playlists"
            element={
              <div className="text-white-300 text-xl">
                Your Library is Empty 2
              </div>
            }
          />
          <Route path="/artists" element={<ArtistProfile />} />
          <Route
            path="/albums"
            element={
              <div className="text-white-300 text-xl">
                Your Library is Empty 4
              </div>
            }
          />
          <Route path="/" element={<Liked />} />
        </Routes>
      </div>
    </div>
  );
}

export default Library;
