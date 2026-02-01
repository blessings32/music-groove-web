import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { useAudio } from "../../context/AudioContext";

function TrackCard(props) {
  const { play, likeTrack, unLikeTrack } = useAudio();
  const [showMenu, setShowMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef(null);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setShowMenu(false);
    if (!isLiked) {
      likeTrack(props);
    } else {
      unLikeTrack(props);
    }
  };

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    if (!showMenu && menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.right - 144, // 144 = menu width (w-36 = 9rem = 144px)
      });
    }
    setShowMenu(!showMenu);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showMenu) setShowMenu(false);
    };
    if (showMenu) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showMenu]);

  // Render menu dropdown as portal
  const menuDropdown = showMenu
    ? ReactDOM.createPortal(
        <div
          className="fixed w-36 bg-gray-800 rounded-md shadow-lg py-1"
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
            zIndex: 9999,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={handleLike}
            className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-2"
          >
            <i className={`fas fa-heart ${isLiked ? "text-red-500" : ""}`}></i>
            {isLiked ? "Unlike" : "Like"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-200 hover:bg-gray-700 flex items-center gap-2"
          >
            <i className="fas fa-plus"></i>
            Add to Playlist
          </button>
        </div>,
        document.body,
      )
    : null;

  const { CardType } = props;
  if (CardType === "suggestion") {
    let imageLocation = props.image; //?.replace("\\", "");
    //     imageLocation = imageLocation.replace(/\\/g, "/");
    //     imageLocation = imageLocation.replace(".", "");

    return (
      <div className="relative h-56 w-48 cursor-pointer group mix-blend-screen flex-shrink-0 ">
        <div className="h-4/6 relative">
          <img
            src={imageLocation}
            alt="Track Cover"
            className="w-full h-max object-cover rounded-sm"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => {
                play(props);
              }}
              className="absolute flex justify-center items-center active:bg-slate-400 w-12 h-12 right-2 bottom-2 bg-gray-200 text-2xl text-black rounded-full hover:bg-gray-300 hover:scale-110 transition-colors duration-300"
            >
              <i className="fas fa-play"></i>
            </button>
          </div>
          {/* Three dots menu */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              ref={menuButtonRef}
              onClick={handleMenuToggle}
              className="w-8 h-8 flex items-center justify-center text-white bg-black bg-opacity-50 hover:bg-gray-700 rounded-full transition-colors duration-300"
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          {menuDropdown}
        </div>
        <div className="h-2/6 mt-2 pl-2 pb-1">
          <h3 className="text-white font-semibold text-lg">{props.title}</h3>
          <p className="text-gray-400 text-sm">{props.artist}</p>
          <p className="text-gray-400 text-sm">{props.album}</p>
        </div>
      </div>
    );
  } else if (CardType === "recent") {
    return (
      <div className="relative h-56 w-36 cursor-pointer group mix-blend-screen flex-shrink-0">
        <div className="h-4/6 relative">
          <img
            src={props.image}
            alt="Track Cover"
            className="w-full h-full object-cover rounded-sm"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => play(props)}
              className="absolute z-50 active:bg-slate-400 w-12 h-12 right-2 bottom-2 bg-gray-200 text-2xl text-black rounded-full hover:bg-gray-300 hover:scale-110 transition-colors duration-300"
            >
              <i className="fas fa-play"></i>
            </button>
          </div>
          {/* Three dots menu */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              ref={menuButtonRef}
              onClick={handleMenuToggle}
              className="w-8 h-8 flex items-center justify-center text-white bg-black bg-opacity-50 hover:bg-gray-700 rounded-full transition-colors duration-300"
            >
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
          {menuDropdown}
        </div>
        <div className="h-2/6 mt-2 pl-2 pb-1">
          <h3 className="text-white font-semibold text-md text-ellipsis h-12">
            {props.title}
          </h3>
          <p className="text-gray-400 text-sm">{props.artist}</p>
        </div>
      </div>
    );
  } else if (CardType === "artist") {
    return (
      <div className="h-44 w-40 relative cursor-pointer group flex-shrink-0">
        <img
          src={props.image}
          alt="Track Cover"
          className="w-36 h-36 object-cover rounded-full"
        />
        <div className="h-2/6 mt-2 pl-2 pb-1">
          <h3 className="text-white font-semibold text-lg">{props.artist}</h3>
        </div>
      </div>
    );
  }
}

export default TrackCard;
