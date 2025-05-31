import React, {
	useCallback,
	useEffect,
	useState
} from 'react';

const MAX_IMAGE_SIZE_MB = 5;
const MAX_DIMENSION = 1024;

/**
 * Resize an image to fit within the specified maximum dimension
 * and compress it to ensure it does not exceed the maximum size.
 *
 * @param base64Str - The base64 string of the image to resize.
 * @param callback - A callback function that receives the resized image as a base64 string.
 */
export const resizeImage = (
	base64Str: string,
	callback: (resizedImage: string) => void
): void => {
	const img = new Image();
	img.src = base64Str;

	img.onload = () => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (!ctx) return;

		let width = img.width;
		let height = img.height;

		if (width > height && width > MAX_DIMENSION) {
			height *= MAX_DIMENSION / width;
			width = MAX_DIMENSION;
		} else if (height > MAX_DIMENSION) {
			width *= MAX_DIMENSION / height;
			height = MAX_DIMENSION;
		}

		canvas.width = width;
		canvas.height = height;
		ctx.drawImage(img, 0, 0, width, height);

		let quality = 0.9;
		let newBase64 = canvas.toDataURL(
			'image/jpeg',
			quality
		);

		while (
			(newBase64.length * 2) / 1024 / 1024 >
				MAX_IMAGE_SIZE_MB &&
			quality > 0.1
		) {
			quality -= 0.1;
			newBase64 = canvas.toDataURL(
				'image/jpeg',
				quality
			);
		}

		callback(newBase64);
	};
};

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
