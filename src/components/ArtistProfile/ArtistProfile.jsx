import { useState } from "react";
import { Link } from "react-router-dom";

// Sample data for popular tracks
const popularTracks = [
  { id: 1, title: "Agency five.", year: "2024", description: "Sell real still six." },
  { id: 2, title: "Huge.", year: "2016", description: "Though successful from." },
  { id: 3, title: "Happen big.", year: "2020", description: "Almost." },
  { id: 4, title: "Structure.", year: "2024", description: "Stuff." },
  { id: 5, title: "Meet.", year: "2020", description: "Bed strategy." },
  { id: 6, title: "Mission stay.", year: "2019", description: "Resource between." },
];

// Sample data for discovery tracks
const discoveryTracks = [
  { id: 1, title: "Upon.", year: "2016", description: "Though successful from." },
  { id: 2, title: "More worry.", year: "2017", description: "Respond while." },
  { id: 3, title: "Might.", year: "2020", description: "Lead affect." },
  { id: 4, title: "Arrive away.", year: "2020", description: "Card return night." },
  { id: 5, title: "Seem believe.", year: "2020", description: "Almost." },
  { id: 6, title: "Citizen.", year: "2017", description: "Reflect." },
];

// Popular Track Card Component
const PopularTrackCard = ({ track, image }) => (
  <div className="flex items-center h-14 bg-neutral-800/50 hover:bg-neutral-700/60 rounded-sm cursor-pointer transition-all duration-200 group">
    <img
      src={image}
      alt={track.title}
      className="w-14 h-14 object-cover rounded-sm flex-shrink-0"
    />
    <div className="ml-3 flex-1 min-w-0">
      <div className="text-white text-sm font-medium truncate">{track.title}</div>
      <div className="text-gray-400 text-xs truncate">{track.year}. {track.description}</div>
    </div>
  </div>
);

// Discovery Card Component
const DiscoveryCard = ({ track, image }) => (
  <div className="flex-shrink-0 w-36 cursor-pointer group">
    <div className="relative overflow-hidden rounded-sm">
      <img
        src={image}
        alt={track.title}
        className="w-36 h-36 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
        <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:scale-110">
          <i className="fas fa-play text-black text-sm ml-0.5"></i>
        </button>
      </div>
    </div>
    <div className="mt-2">
      <div className="text-white text-sm font-medium truncate">{track.title}</div>
      <div className="text-gray-400 text-xs truncate">{track.year}. {track.description}</div>
    </div>
  </div>
);

function ArtistProfile() {
  const [activeTab, setActiveTab] = useState("artists");

  // Sample images - using placeholder paths
  const heroImage = "/images/artwork/dj-khalid/1200x680_gettyimages-1397516110.jpg";
  const sampleImages = [
    "/images8/1.jpg",
    "/images8/2.jpg",
    "/images8/3.jpg",
    "/images8/4.jpg",
    "/images8/5.jpg",
    "/images8/6.jpg",
  ];
  const latestReleaseImage = "/images8/7.jpg";

  return (
    <div className="w-full h-[calc(100%-3.5rem)] overflow-y-scroll">
      <div className="w-full p-0 pt-2 flex flex-col text-gray-100">
        
        {/* Filter Tabs */}
        <div className="w-full flex flex-row space-x-3 text-sm px-4 mb-4">
          <Link
            to="/library/liked"
            className={`px-4 py-1.5 border border-gray-500 rounded-sm flex items-center justify-center transition-colors duration-150 ease-in-out ${
              activeTab === "liked" 
                ? "bg-sky-600 border-sky-600 text-white" 
                : "text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("liked")}
          >
            <i className="fa fa-heart text-sky-400 text-sm mr-2"></i>
            Liked
          </Link>
          <button
            className={`px-4 py-1.5 border border-gray-500 rounded-sm flex items-center justify-center transition-colors duration-150 ease-in-out ${
              activeTab === "playlists" 
                ? "bg-sky-600 border-sky-600 text-white" 
                : "text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("playlists")}
          >
            Playlists
          </button>
          <button
            className={`px-4 py-1.5 border border-sky-500 bg-sky-600/20 rounded-sm flex items-center justify-center transition-colors duration-150 ease-in-out ${
              activeTab === "artists" 
                ? "bg-sky-600 border-sky-600 text-white" 
                : "text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("artists")}
          >
            Artist
          </button>
          <button
            className={`px-4 py-1.5 border border-gray-500 rounded-sm flex items-center justify-center transition-colors duration-150 ease-in-out ${
              activeTab === "albums" 
                ? "bg-sky-600 border-sky-600 text-white" 
                : "text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => setActiveTab("albums")}
          >
            Albums
          </button>
        </div>

        {/* Hero Banner */}
        <div className="w-full h-64 mb-6 relative mx-0">
          <img
            src={heroImage}
            alt="Artist Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <div className="w-full h-full relative">
              <h1 className="absolute font-bold text-3xl text-white bottom-6 left-6 drop-shadow-lg">
                Kenneth Anderson Iv
              </h1>
            </div>
          </div>
          {/* Floating mini images on the right */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-row gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-12 h-12 rounded-sm overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                <img
                  src={sampleImages[i] || "/images8/1.jpg"}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Popular and Latest Release Section */}
        <div className="w-full flex flex-row gap-6 px-4 mb-6">
          {/* Popular Section */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white mb-4">Popular</h2>
            <div className="grid grid-cols-3 gap-3">
              {popularTracks.map((track, index) => (
                <PopularTrackCard
                  key={track.id}
                  track={track}
                  image={sampleImages[index % sampleImages.length] || "/images8/1.jpg"}
                />
              ))}
            </div>
          </div>

          {/* Latest Release Section */}
          <div className="w-48 flex-shrink-0">
            <h2 className="text-xl font-semibold text-white mb-4">Latest Release</h2>
            <div className="relative cursor-pointer group">
              <img
                src={latestReleaseImage}
                alt="Latest Release"
                className="w-full h-44 object-cover rounded-sm"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center rounded-sm">
                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/90 flex items-center justify-center hover:scale-110">
                  <i className="fas fa-play text-black text-lg ml-1"></i>
                </button>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-gray-400 text-xs">2022. Owner free</div>
              <div className="text-gray-400 text-xs">sometimes.</div>
            </div>
          </div>
        </div>

        {/* Discovery Section */}
        <div className="w-full px-4 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Discovery</h2>
          <div className="flex flex-row gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {discoveryTracks.map((track, index) => (
              <DiscoveryCard
                key={track.id}
                track={track}
                image={sampleImages[index % sampleImages.length] || "/images8/1.jpg"}
              />
            ))}
          </div>
        </div>

        {/* Albums Section */}
        <div className="w-full px-4 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Albums</h2>
          <div className="flex flex-row gap-4 overflow-x-auto pb-2">
            {[
              { title: "Owner free sometimes.", year: "2022", type: "Album" },
              { title: "Be one.", year: "2023", type: "Album" },
            ].map((album, index) => (
              <div key={index} className="flex-shrink-0 w-40 cursor-pointer group">
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={sampleImages[index] || "/images8/1.jpg"}
                    alt={album.title}
                    className="w-40 h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center hover:scale-110">
                      <i className="fas fa-play text-black text-sm ml-0.5"></i>
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-white text-sm font-medium truncate">{album.title}</div>
                  <div className="text-gray-400 text-xs">{album.year}. {album.type}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default ArtistProfile;
