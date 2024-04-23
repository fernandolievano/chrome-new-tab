import React from 'react';
import useClock from 'hooks/useClock';

import './clock.css';

const Clock = () => {
  const { prettifiedTime } = useClock();

  return (
    <div className="py-8 px-4 z-10">
      <h2 className='clock-time select-none text-9xl font-light'>{prettifiedTime()}</h2>
    </div>
  );
};

export default Clock;