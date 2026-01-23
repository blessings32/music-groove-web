import React from "react";

function trackCard(props) {
  const { CardType } = props;
  if (CardType === "suggestion") {
    console.log(props);
    let imageLocation = props.image.replace("\\", "");
    imageLocation = imageLocation.replace(/\\/g, "/");
    imageLocation = imageLocation.replace(".", "");

    return (
      <div className="relative h-56 w-48 cursor-pointer group mix-blend-screen flex-shrink-0 ">
        <div className="h-4/6 relative">
          <img
            src={imageLocation}
            alt="Track Cover"
            className="w-full h-max object-cover rounded-sm"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="absolute flex justify-center items-center active:bg-slate-400 w-12 h-12 right-2 bottom-2 bg-gray-200 text-2xl text-black rounded-full hover:bg-gray-300 hover:scale-110 transition-colors duration-300">
              <i className="fas fa-play"></i>
            </button>
          </div>
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
            src={props.artwork}
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

export default trackCard;
