import React, { useEffect, useRef } from "react";
import { useAudio } from "../../context/AudioContext";

function TracksPopup({ tracks, isOpen, onClose, title = "Tracks" }) {
  const { play, queueRef, nextPlaylist } = useAudio();
  const popupRef = useRef(null);

  tracks = queueRef.current.getState().upcoming || tracks;
  tracks = [queueRef.current.getState().current, ...tracks];
  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  //   const formatDuration = (seconds) => {
  //     if (!seconds) return "0:00";
  //     const mins = Math.floor(seconds / 60);
  //     const secs = Math.floor(seconds % 60);
  //     return `${mins}:${secs.toString().padStart(2, "0")}`;
  //   };

  const getImageUrl = (track) => {
    if (track.image) {
      let imageLocation = track.image; //.replace("\\", "");
      //imageLocation = imageLocation.replace(/\\/g, "/");
      //imageLocation = imageLocation.replace(".", "");
      return imageLocation;
    }
    return track.artwork || null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="bg-gray-900 rounded-lg w-11/12 max-w-2xl max-h-[80vh] flex flex-col shadow-2xl border border-gray-800 animate-popup"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-sky-800 rounded-t-lg">
          <h2 className="text-xl font-extrabold text-gray-50">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 rounded-full transition-colors duration-300"
          >
            <i className="fa fa-times"></i>
          </button>
        </div>

        {/* Track List */}
        <div className="flex-1 overflow-y-auto p-4">
          {tracks && tracks.length > 0 ? (
            <div className="space-y-2">
              {tracks.map((track, index) => (
                <div
                  key={track.id || track.track_id || index}
                  className="flex items-center gap-4 p-3 rounded-md bg-gray-800 hover:bg-gray-700 cursor-pointer group transition-colors duration-300"
                  onClick={() => play(track)}
                >
                  {/* Track Number */}
                  <span className="w-6 text-center text-gray-500 text-sm group-hover:hidden">
                    {index + 1}
                  </span>
                  <span className="w-6 text-center text-gray-200 text-sm hidden group-hover:block">
                    <i className="fa fa-play text-sky-400"></i>
                  </span>

                  {/* Track Image */}
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <img
                      src={getImageUrl(track)}
                      alt={track.title}
                      className="w-full h-full object-cover rounded-sm"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <i className="fa fa-play text-white text-sm"></i>
                    </div>
                  </div>

                  {/* Track Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm truncate">
                      {track.title}
                    </h3>
                    <p className="text-gray-400 text-xs truncate">
                      {track.artist}
                    </p>
                  </div>

                  {/* Album */}
                  <div className="hidden md:block w-32 truncate">
                    <p className="text-gray-400 text-xs truncate">
                      {track.album || "Unknown Album"}
                    </p>
                  </div>

                  {/* Duration */}
                  <span className="text-gray-400 text-xs w-12 text-right">
                    {track.duration}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 rounded-full transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to favorites logic here
                      }}
                    >
                      <i className="fa fa-heart"></i>
                    </button>
                    <button
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-600 rounded-full transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        // More options logic here
                      }}
                    >
                      <i className="fa fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-gray-400">
              <i className="fa fa-music text-4xl mb-4"></i>
              <p>No tracks available</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 flex items-center justify-between">
          <span className="text-gray-400 text-sm">
            {tracks ? tracks.length : 0} tracks
          </span>

          <button
            onClick={() => {
              nextPlaylist();
            }}
            className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-full transition-colors duration-300 flex items-center gap-2"
          >
            <i className="fa fa-forward"></i>
          </button>

          <button
            onClick={() => {
              if (tracks && tracks.length > 0) {
                play(tracks[0]);
              }
            }}
            className="px-6 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-full transition-colors duration-300 flex items-center gap-2"
          >
            <i className="fa fa-play"></i>
            Play All
          </button>
        </div>
      </div>
    </div>
  );
}

export default TracksPopup;
