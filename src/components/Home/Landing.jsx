import TrackCard from "../reusable/trackCard";
const Landing = ({ properties }) => {
  const { suggestedTracks, recentTracks, artists } = properties;
  return (
    <div className="w-full h-[calc(100%-3.5rem)] overflow-y-scroll p-4">
      <div className="flex flex-row gap-5 overflow-x-scroll">
        {suggestedTracks.map((track) => {
          return (
            <TrackCard key={track.track_id} CardType="suggestion" {...track} />
          );
        })}
      </div>
      <div>
        <h1 className="text-xl text-gray-300 pb-4">Recent Plays {">"}</h1>
        <div className="flex flex-row gap-5 overflow-x-scroll">
          {recentTracks.map((track) => {
            return (
              <TrackCard key={track.track_id} CardType="recent" {...track} />
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="text-xl text-gray-300 pb-4">Artits {">"}</h1>
        <div className="flex flex-row gap-5 overflow-x-scroll">
          {artists.map((artist) => {
            return (
              <TrackCard key={artist.artist_id} CardType="artist" {...artist} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Landing;
