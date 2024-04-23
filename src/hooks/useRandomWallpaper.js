import { useState, useEffect } from 'react';
import useCheckConnection from './useCheckConnection';

const useRandomWallpaper = () => {
  const [wallpaper, setWallpaper] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const { online } = useCheckConnection();

  useEffect(() => {
    if (online) {
      setIsLoading(true);

      try {
        fetch('https://bing.biturl.top/?resolution=1920&format=json&index=0&mkt=en-US')
          .then(response => response.json())
          .then(data => {
            setIsLoading(false);
            setWallpaper(data);
          });
      } catch (error) {
        setErrors(error);
      }
    }
  }, []);

  return {
    errors,
    isLoading,
    wallpaper
  };
};

export default useRandomWallpaper;