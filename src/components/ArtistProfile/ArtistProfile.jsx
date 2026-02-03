function ArtistProfile() {
  return (
    <div>
      <div className="w-full p-0 pt-2 flex flex-col text-gray-100">
        <div className="w-full h-72 mb-4 relative">
          <img
            src="../../../public/images/artwork/dj-khalid/1200x680_gettyimages-1397516110.jpg"
            className=" w-full h-full object-cover"
          />
          <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent ">
            <div className="w-full h-full relative">
              <div className="absolute font-bold text-2xl text-white bottom-4 left-4">
                Artist Name
              </div>
            </div>
          </div>
        </div>
        {/* POPULAR AND LATEST*/}
        <div className="w-full h-44 flex flex-row">
          <div className="border h-full border-yellow-500 w-9/12">
            <h1>Popular release</h1>
            <div className="flex flex-row w-full flex-wrap">
              <div className="w-72	 h-14 m-2 shadow-[4px_0px_4px_1px_rgba(0,0,0,0.3)] space-x-4 cursor-pointer">
                <img
                  src="../../../public/images/artwork/dj-khalid/1200x680_gettyimages-1397516110.jpg"
                  className="w-4/12 h-full object-cover float-left mr-2"
                />
                <div className="text-white mt-2 text-md">Title</div>
                <div className="text-gray-400 text-sm">year. Album</div>
              </div>

              <div className="w-72 h-14 m-2 shadow-[4px_0px_4px_1px_rgba(0,0,0,0.3)] space-x-4 cursor-pointer">
                <img
                  src="../../../public/images/artwork/dj-khalid/1200x680_gettyimages-1397516110.jpg"
                  className="w-4/12 h-full object-cover float-left mr-2"
                />
                <div className="text-white mt-2 text-md">Title</div>
                <div className="text-gray-400 text-sm">year. Album</div>
              </div>

              <div className="w-72 h-14 m-2 shadow-[4px_0px_4px_1px_rgba(0,0,0,0.3)] space-x-4 cursor-pointer">
                <img
                  src="../../../public/images/artwork/dj-khalid/1200x680_gettyimages-1397516110.jpg"
                  className="w-4/12 h-full object-cover float-left mr-2"
                />
                <div className="text-white mt-2 text-md">Title</div>
                <div className="text-gray-400 text-sm">year. Album</div>
              </div>

              <div className="w-72 h-14 m-2 shadow-[4px_0px_4px_1px_rgba(0,0,0,0.3)] space-x-4 cursor-pointer">
                <img
                  src="../../../public/images/artwork/dj-khalid/1200x680_gettyimages-1397516110.jpg"
                  className="w-4/12 h-full object-cover float-left mr-2"
                />
                <div className="text-white mt-2 text-md">Title</div>
                <div className="text-gray-400 text-sm">year. Album</div>
              </div>

              <div className="w-72 h-14 m-2 shadow-[4px_0px_4px_1px_rgba(0,0,0,0.3)] space-x-4 cursor-pointer">
                <img
                  src="../../../public/images/artwork/dj-khalid/1200x680_gettyimages-1397516110.jpg"
                  className="w-4/12 h-full object-cover float-left mr-2"
                />
                <div className="text-white mt-2 text-md">Title</div>
                <div className="text-gray-400 text-sm">year. Album</div>
              </div>

              <div className="w-72 h-14 m-2 shadow-[4px_0px_4px_1px_rgba(0,0,0,0.3)] space-x-4 cursor-pointer">
                <img
                  src="../../../public/images/artwork/dj-khalid/1200x680_gettyimages-1397516110.jpg"
                  className="w-4/12 h-full object-cover float-left mr-2"
                />
                <div className="text-white mt-2 text-md">Title</div>
                <div className="text-gray-400 text-sm">year. Album</div>
              </div>

              <div className="w-72 h-14 m-2 shadow-[4px_0px_4px_1px_rgba(0,0,0,0.3)] space-x-4 cursor-pointer">
                <img
                  src="../../../public/images/artwork/dj-khalid/1200x680_gettyimages-1397516110.jpg"
                  className="w-4/12 h-full object-cover float-left mr-2"
                />
                <div className="text-white mt-2 text-md">Title</div>
                <div className="text-gray-400 text-sm">year. Album</div>
              </div>

              <div className="w-72 h-14 m-2 shadow-[4px_0px_4px_1px_rgba(0,0,0,0.3)] space-x-4 cursor-pointer">
                <img
                  src="../../../public/images/artwork/dj-khalid/1200x680_gettyimages-1397516110.jpg"
                  className="w-4/12 h-full object-cover float-left mr-2"
                />
                <div className="text-white mt-2 text-md">Title</div>
                <div className="text-gray-400 text-sm">year. Album</div>
              </div>
            </div>
          </div>
          <div className="border h-full border-yellow-500 w-3/12"></div>
        </div>
        <div className="w-full border h-32 mt-4"></div>
        <div className="w-full border h-32 mt-4"></div>
      </div>
    </div>
  );
}

export default ArtistProfile;
