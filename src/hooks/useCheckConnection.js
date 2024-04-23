import React, { useEffect, useState } from 'react';

const useCheckConnection = () => {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const getRandomString = () => {
      return Math.random().toString(36).substring(2, 15);
    };

    const isOnline = async () => {
      if (!navigator.onLine) setOnline(false);

      // avoid CORS errors with a request to your own origin
      const url = new URL('https://dolarapi.com/v1/dolares');

      // random value to prevent cached responses
      url.searchParams.set('rand', getRandomString());

      try {
        const response = await fetch(
          url.toString(),
          { method: 'HEAD' },
        );

        console.log('status online: ', response.ok)
        setOnline(response.ok)
      } catch {
        console.log('status offline')
        setOnline(false)
      }
    };

    isOnline()
  }, []);

  return {
    online
  };
};

export default useCheckConnection;