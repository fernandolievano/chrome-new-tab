import { useEffect, useState, useRef } from 'react';
import { checkOnline } from '../../utils/checkOnlineStatus';

type Tab = {
	id: number;
	title: string;
	url: string;
};

const useSystemPanel = () => {
	const [tabs, setTabs] = useState<Tab[]>([]);
	const [tabsCount, setTabsCount] = useState<number>(0);
	const [mediaTabs, setMediaTabs] = useState<Tab[]>([]);
	const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

	const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
	const marqueeRef = useRef<HTMLDivElement>(null);

	const updateTabsInfo = () => {
		if (chrome?.tabs) {
			chrome.tabs.query({}, (tabs) => {
				setTabsCount(tabs.length);
				const formatted = tabs.map((tab) => ({
					id: tab.id ?? 0,
					title: tab.title ?? 'Sin título',
					url: tab.url ?? ''
				}));
				setTabs(formatted);
			});
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

	const toggleDetailsModal = (payload = true) => {
		const detailsModal = document.getElementById(
			'system-panel-details'
		) as HTMLDivElement;

		if (isOverflowing && payload) {
			if (detailsModal) {
				detailsModal.classList.remove(
					'opacity-0',
					'invisible',
					'-z-40'
				);
				detailsModal.classList.add('opacity-100', 'visible', 'z-40');
			}
		} else {
			if (!payload) {
				if (detailsModal) {
					detailsModal.classList.remove(
						'opacity-100',
						'visible',
						'z-40'
					);
					detailsModal.classList.add(
						'opacity-0',
						'invisible',
						'-z-40'
					);
				}
			} else {
				console.info('no popup needed!');
			}
		}
	};

	useEffect(() => {
		// Estado de conexión
		const updateOnlineStatus = async () => {
			const realStatus = await checkOnline();
			setIsOnline(realStatus);
		};
		updateOnlineStatus();
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
		tabs,
		mediaTabs,
		isOverflowing,
		marqueeRef,
		toggleDetailsModal
	};
};

export default useSystemPanel;
