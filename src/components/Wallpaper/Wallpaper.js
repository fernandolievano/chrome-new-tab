import React from 'react';
import useRandomWallpaper from 'hooks/useRandomWallpaper';
import './wallpaper.css';

const Wallpaper = () => {
  const { wallpaper } = useRandomWallpaper();


  return (
    <div className={`text-white wallpaper-att absolute top-3 left-3 text-xs ${wallpaper.copyright ? 'visible' : 'hidden'}`}>
      <a className='flex gap-2 items-center' href={wallpaper.copyright_link} target="_blank" rel="noopener noreferrer">
        <img className='w-4' src="/imageicon.png" alt="image icon" title="Icon by Fathema Khanom" />
        <strong>{wallpaper.copyright}</strong>
      </a>
    </div>
  );
};

export default Wallpaper;