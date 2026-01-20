import React from "react";

function trackCard(props) {
  const { CardType } = props;
  if (CardType === "suggestion") {
    return (
      <div className="relative h-56 w-48 cursor-pointer group mix-blend-screen ">
        <div className="h-4/6 relative">
          <img
            src="https://images.unsplash.com/photo-1554830310-5b57379d04e6?fm=jpg"
            alt="Track Cover"
            className="w-full h-full object-cover rounded-sm"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="absolute active:bg-slate-400 w-12 h-12 right-2 bottom-2 bg-gray-200 text-2xl text-black rounded-full hover:bg-gray-300 hover:scale-110 transition-colors duration-300">
              <i className="fas fa-play"></i>
            </button>
          </div>
        </div>
        <div className="h-2/6 mt-2 pl-2 pb-1">
          <h3 className="text-white font-semibold text-lg">Track Title</h3>
          <p className="text-gray-400 text-sm">Artist Name</p>
          <p className="text-gray-400 text-sm">Album Name</p>
        </div>
      </div>
    );
  } else if (CardType === "recent") {
    return (
      <div className="relative h-48 w-36 cursor-pointer group mix-blend-screen ">
        <div className="h-4/6 relative">
          <img
            src="https://images.unsplash.com/photo-1554830310-5b57379d04e6?fm=jpg"
            alt="Track Cover"
            className="w-full h-full object-cover rounded-sm"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="absolute active:bg-slate-400 w-12 h-12 right-2 bottom-2 bg-gray-200 text-2xl text-black rounded-full hover:bg-gray-300 hover:scale-110 transition-colors duration-300">
              <i className="fas fa-play"></i>
            </button>
          </div>
        </div>
        <div className="h-2/6 mt-2 pl-2 pb-1">
          <h3 className="text-white font-semibold text-lg">Track Title</h3>
          <p className="text-gray-400 text-sm">Artist Name</p>
        </div>
      </div>
    );
  } else if (CardType === "artist") {
    return (
      <div className="h-44 w-40 relative">
        <img
          src="/music-groove/public/images/artist/maxresdefault.jpg"
          alt="Track Cover"
          className="w-36 h-36 object-cover rounded-full"
        />
        <div className="h-2/6 mt-2 pl-2 pb-1">
          <h3 className="text-white font-semibold text-lg ">Artist Name</h3>
        </div>
      </div>
    );
  }
}

export default trackCard;
