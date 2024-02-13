import { useEffect, useState } from 'react';

const useClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const tick = () => {
    setCurrentTime(new Date());
  };

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      tick();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const formatMinutes = (val) => {
    if (val < 10) {
      val = "0" + val;
    }
    return val;
  };

  const prettifiedTime = () => {
    return `${currentTime.getHours()} : ${formatMinutes(currentTime.getMinutes())}`
  }

  return {
    prettifiedTime
  };
};

export default useClock;