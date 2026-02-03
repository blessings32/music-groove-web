function ArtistProfile() {
  return (
    <div>
      <div className="w-full p-0 pt-2 flex flex-col">
        <div className="w-full h-64 mb-4 relative">
          <div className="bg-yellow-500 w-full h-full"></div>
          <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent ">
            <div className="w-full h-full relative">
              <div className="absolute font-bold text-2xl text-white bottom-4 left-4">
                Artist Name
              </div>
            </div>
          </div>
        </div>
        <div className="w-full border h-52"></div>
        <div className="w-full border h-32 mt-4"></div>
        <div className="w-full border h-32 mt-4"></div>
      </div>
    </div>
  );
}

export default ArtistProfile;
