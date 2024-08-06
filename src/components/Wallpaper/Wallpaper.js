import React from 'react';
import useCustomWallpaper from 'hooks/useCustomWallpaper';
import './wallpaper.css';

const Wallpaper = () => {
  const { wallpaper, handleImageChange } = useCustomWallpaper();
  const defaultWallpaper = '/emilio-lujan-OKWAtnEfN4M-unsplash.jpg';

  return (
    <div className="absolute w-screen h-screen overflow-hidden">
      <img
        src={wallpaper}
        className='object-cover object-top w-full h-auto mx-auto opacity-40'
        loading='eager'
        alt='New Tab'
        onError={e => e.target.src = defaultWallpaper}
      />

      <div className="absolute top-0 right-0 px-6 py-6">
        <input
          type="file"
          accept='image/*'
          onChange={handleImageChange}
          className='hidden'
          id='fileInput'
        />
        <label htmlFor="fileInput"
          className='flex items-center justify-center w-8 h-8 transition-all bg-white border border-white rounded-full shadow-sm cursor-pointer border-opacity-15 bg-opacity-10 backdrop-blur-md hover:bg-black hover:bg-opacity-30'
          title='Edit background'
        >
          <img src="/icons8-edit.svg" alt="edit icon" className='w-4 h-4' />
        </label>
      </div>
    </div>
  );
};

export default Wallpaper;