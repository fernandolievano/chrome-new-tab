import { useEffect, useState } from 'react';

type MediaTab = {
	id: number;
	title: string;
	url: string;
};

const useSystemPanel = () => {
	const [tabsCount, setTabsCount] = useState<number>(0);
	const [mediaTabs, setMediaTabs] = useState<MediaTab[]>([]);
	const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

	const updateTabsInfo = () => {
		if (chrome?.tabs) {
			chrome.tabs.query({}, (tabs) => setTabsCount(tabs.length));
			chrome.tabs.query({ audible: true }, (audibleTabs) => {
				const formatted = audibleTabs.map((tab) => ({
					id: tab.id ?? 0,
					title: tab.title ?? 'Sin título',
					url: tab.url ?? ''
				}));
				setMediaTabs(formatted);
			});
		}
	};

	useEffect(() => {
		// Estado de conexión
		const updateOnlineStatus = () => setIsOnline(navigator.onLine);
		window.addEventListener('online', updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);

		updateTabsInfo();

		const handleTabChange = () => updateTabsInfo();

		// Validar que los eventos existan antes de usarlos
		const hasListeners =
			chrome?.tabs?.onCreated &&
			chrome?.tabs?.onRemoved &&
			chrome?.tabs?.onUpdated;

		if (hasListeners) {
			chrome.tabs.onCreated.addListener(handleTabChange);
			chrome.tabs.onRemoved.addListener(handleTabChange);
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			chrome.tabs.onUpdated.addListener((_tabId, _changeInfo, _tab) => {
				handleTabChange();
			});
		} else {
			console.warn('Listeners de tabs no disponibles en este contexto.');
		}

		return () => {
			window.removeEventListener('online', updateOnlineStatus);
			window.removeEventListener('offline', updateOnlineStatus);

			if (hasListeners) {
				chrome.tabs.onCreated.removeListener(handleTabChange);
				chrome.tabs.onRemoved.removeListener(handleTabChange);
				chrome.tabs.onUpdated.removeListener(handleTabChange);
			}
		};
	}, []);

	return {
		isOnline,
		tabsCount,
		mediaTabs
	};
};

export default useSystemPanel;
