import { useEffect, useState, useRef } from 'react';

type MediaTab = {
	id: number;
	title: string;
	url: string;
};

const useSystemPanel = () => {
	const [tabsCount, setTabsCount] = useState<number>(0);
	const [mediaTabs, setMediaTabs] = useState<MediaTab[]>([
		{
			id: 123123,
			title: 'Beneath Your Beautiful (con Emeli Sandé) - YouTube Music ♠︎⋆⁺₊',
			url: 'https://www.youtube.com/watch?v=hsnfBhCevUc&t=2500s'
		},
		{
			id: 4356456,
			title: 'Lonely - YouTube Music',
			url: 'https://www.youtube.com/watch?v=hsnfBhCevUc&t=2500s'
		}
	]);
	const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

	const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
	const marqueeRef = useRef<HTMLDivElement>(null);

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

	const showInfo = () => {
		if (isOverflowing) {
			alert('expanded info!');
		} else {
			console.info('no popup needed!');
		}
	};

	useEffect(() => {
		// Estado de conexión
		const updateOnlineStatus = () => setIsOnline(navigator.onLine);
		window.addEventListener('online', updateOnlineStatus);
		window.addEventListener('offline', updateOnlineStatus);

		// Detectar overflow al montar
		const checkOverflow = () => {
			if (marqueeRef.current) {
				const { scrollWidth, clientWidth } = marqueeRef.current;
				setIsOverflowing(scrollWidth > clientWidth);
			}
		};

		checkOverflow();
		window.addEventListener('resize', checkOverflow);

		// Actualizar info relacionada a las pestañas
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
			window.removeEventListener('resize', checkOverflow);

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
		mediaTabs,
		isOverflowing,
		marqueeRef,
		showInfo
	};
};

export default useSystemPanel;
