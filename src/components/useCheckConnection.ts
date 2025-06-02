import { useEffect, useState } from 'react';

const useCheckConnection = () => {
	const [isOnline, setIsOnline] = useState(true);

	useEffect(() => {
		const getRandomString = () =>
			Math.random().toString(36).substring(2, 15);

		const checkConnection = async () => {
			if (!navigator.onLine) {
				setIsOnline(false);
				return;
			}

			const url = new URL('https://dolarapi.com/v1/dolares');
			url.searchParams.set('rand', getRandomString());

			try {
				const response = await fetch(url.toString(), {
					method: 'HEAD'
				});
				setIsOnline(response.ok);
			} catch (error) {
				console.error('Connection check failed:', error);
				setIsOnline(false);
			}
		};

		checkConnection();
	}, []);

	return { isOnline };
};

export default useCheckConnection;
