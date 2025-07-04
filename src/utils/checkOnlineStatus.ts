export const checkOnline = async () => {
	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 2000);

		await fetch('https://www.google.com/favicon.ico', {
			method: 'HEAD',
			mode: 'no-cors',
			signal: controller.signal
		});

		clearTimeout(timeout);
		return true;
	} catch {
		return false;
	}
};
