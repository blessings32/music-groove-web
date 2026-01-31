import { Routes, Route, Link } from "react-router-dom";

function Library() {
  return (
    <div className="w-full h-[calc(100%-3.5rem)] overflow-y-scroll p-4">
      <div className="w-3/5 flex flex-row space-x-3 text-sm">
        <Link
          to="/library/liked"
          className="w-24 p-1 border-gray-400 border rounded-sm text-md flex items-center justify-center text-gray-200 hover:bg-gray-300 hover:text-black transition-colors duration-150 ease-in-out"
        >
          <i className="fa fa-heart text-sky-600 text-md mr-1"></i>{" "}
          <span> Liked</span>
        </Link>
        <Link
          to="/library/playlists"
          className="w-24 p-1 border-gray-400 border rounded-sm text-md flex items-center justify-center text-gray-200 hover:bg-gray-300 hover:text-black transition-colors duration-150 ease-in-out"
        >
          Playlists
        </Link>
        <Link
          to="/library/artists"
          className="w-24 p-1 border-gray-400 border rounded-sm text-md flex items-center justify-center text-gray-200 hover:bg-gray-300 hover:text-black transition-colors duration-150 ease-in-out"
        >
          Artists
        </Link>
        <Link
          to="/library/albums"
          className="w-24 p-1 border-gray-400 border rounded-sm text-md flex items-center justify-center text-gray-200 hover:bg-gray-300 hover:text-black transition-colors duration-150 ease-in-out"
        >
          Albums
        </Link>
      </div>
      <div className="bg-red-600 h-8 w-full">
        <Routes>
          <Route
            path="/liked"
            element={
              <div className="text-white-300 text-xl">
                Your Library is Empty 1
              </div>
            }
          />
          <Route
            path="/playlists"
            element={
              <div className="text-white-300 text-xl">
                Your Library is Empty 2
              </div>
            }
          />
          <Route
            path="/artists"
            element={
              <div className="text-white-300 text-xl">
                Your Library is Empty 3
              </div>
            }
          />
          <Route
            path="/albums"
            element={
              <div className="text-white-300 text-xl">
                Your Library is Empty 4
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div className="text-white-300 text-xl">
                Your Library is Empty 1
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default Library;
