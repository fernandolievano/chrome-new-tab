import useClock from './useClock';
import './clock.css';

const Clock = () => {
  const { prettifiedTime } = useClock();

  return (
    <div className="py-8 px-4 z-10">
      <h2
        className="clock-time select-none text-6xl md:text-9xl font-light"
        aria-label={`Current time is ${prettifiedTime}`}
      >
        {prettifiedTime}
      </h2>
    </div>
  );
};

export default Clock;