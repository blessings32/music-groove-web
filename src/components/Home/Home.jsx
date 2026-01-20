import React from "react";
import Trackard from "../reusable/trackCard.jsx";
import axios from "axios";

const url = import.meta.env.VITE_SERVER_URL + "api/tracks/suggested";
const responce = await axios.get(url);
console.log(responce.data.data);
function Home() {
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
              <Trackard CardType="suggestion" />
              <Trackard CardType="suggestion" />
              <Trackard CardType="suggestion" />
            </div>
            <div>
              <h1 className="text-xl text-gray-300 pb-4">Recent Plays {">"}</h1>
              <div className="flex flex-row gap-5 overflow-y-scroll">
                <Trackard CardType="recent" />
                <Trackard CardType="recent" />
                <Trackard CardType="recent" />
              </div>
            </div>
            <div>
              <h1 className="text-xl text-gray-300 pb-4">Artits {">"}</h1>
              <div className="flex flex-row gap-5 overflow-y-scroll">
                <Trackard CardType="artist" />
                <Trackard CardType="artist" />
                <Trackard CardType="artist" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" bg-gray-900 h-[14%] w-full rounded-md"></div>
    </div>
  );
}

export default Home;
