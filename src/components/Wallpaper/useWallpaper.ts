import React, {
	useCallback,
	useEffect,
	useState
} from 'react';

import { resizeImage } from '../../utils/resizeImage';

type useWallpaperReturn = {
	wallpaper: string;
	uploadWallpaper: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
};

const useWallpaper = (): useWallpaperReturn => {
	const [wallpaper, setWallpaper] = useState<string>('');

	useEffect(() => {
		const saved = localStorage.getItem('wallpaper');
		if (saved) setWallpaper(saved);
	}, []);

	const uploadWallpaper = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) return;

			try {
				const reader = new FileReader();
				reader.onloadend = () => {
					if (typeof reader.result === 'string') {
						resizeImage(
							reader.result,
							(resized) => {
								localStorage.setItem(
									'wallpaper',
									resized
								);
								setWallpaper(resized);
							}
						);
					}
				};
				reader.readAsDataURL(file);
			} catch {
				alert(
					'Error loading image, Try another file, ideally under 5MB.'
				);
			}
		},
		[]
	);

	return {
		wallpaper,
		uploadWallpaper
	};
};

export default useWallpaper;
