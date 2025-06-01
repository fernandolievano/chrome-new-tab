import React from 'react';
import useWallpaper from './useWallpaper';
import './wallpaper.css';

const Wallpaper: React.FC = () => {
  const { wallpaper, uploadWallpaper } = useWallpaper();
  const fallback = '/emilio-lujan-OKWAtnEfN4M-unsplash.jpg';

  return (
    <div className="absolute w-screen h-screen overflow-hidden">
      <img
        src={wallpaper || fallback}
        className='object-cover object-top w-full h-full mx-auto opacity-40'
        loading='eager'
        alt="New Tab Wallpaper"
      />

      <div className="absolute top-0 right-0 px-6 py-6">
        <input
          type="file"
          accept="image/*"
          onChange={uploadWallpaper}
          className="hidden"
          id="fileInput"
        />

        <label
          htmlFor="fileInput"
          className="flex items-center justify-center w-8 h-8 transition-all bg-white/10 border border-white/15 rounded-full shadow-sm cursor-pointer backdrop-blur-md hover:bg-black/30 text-transparent"
          title="Edit background"
        >
          <span className="sr-only">Edit background</span>
          <img src="/icons8-edit.svg" alt="Edit icon" className="w-4 h-4" />
        </label>
      </div>
    </div>
  );
};

export default Wallpaper;