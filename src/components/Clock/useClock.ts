import { useEffect, useState, useMemo } from 'react';

const useClock = () => {
	const [currentTime, setCurrentTime] = useState(
		new Date()
	);

	useEffect(() => {
		const tick = () => setCurrentTime(new Date());
		const interval = setInterval(tick, 1000);

		return () => clearInterval(interval);
	}, []);

	const prettifiedTime = useMemo(() => {
		const hours = currentTime.getHours();
		const minutes = currentTime
			.getMinutes()
			.toString()
			.padStart(2, '0');

		return `${hours}:${minutes}`;
	}, [currentTime]);

	return {
		currentTime,
		prettifiedTime
	};
};

export default useClock;
