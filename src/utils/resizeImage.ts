export const resizeImage = (
	base64Str: string,
	callback: (resizedImage: string) => void
) => {
	const img = new Image();
	img.src = base64Str;

	img.onload = () => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const maxSize = 1024;

		let width = img.width;
		let height = img.height;

		if (width > height) {
			if (width > maxSize) {
				height *= maxSize / width;
				width = maxSize;
			}
		} else {
			if (height > maxSize) {
				width *= maxSize / height;
				height = maxSize;
			}
		}

		canvas.width = width;
		canvas.height = height;
		ctx?.drawImage(img, 0, 0, width, height);

		let quality = 0.9;
		let newBase64 = canvas.toDataURL(
			'image/jpeg',
			quality
		);

		while (
			(newBase64.length * 2) / 1024 / 1024 > 5 &&
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
