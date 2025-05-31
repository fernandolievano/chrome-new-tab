import {
	vi,
	beforeEach,
	describe,
	it,
	expect
} from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useWallpaper from './useWallpaper';

vi.mock('../../utils/resizeImage', () => ({
	resizeImage: vi.fn((_, cb) =>
		cb('data:image/jpeg;base64,mocked')
	)
}));

beforeEach(() => {
	localStorage.clear();
});

describe('useWallpaper', () => {
	it('initializes with saved wallpaper from localStorage', () => {
		localStorage.setItem('wallpaper', 'mock-wallpaper');
		const { result } = renderHook(() => useWallpaper());
		expect(result.current.wallpaper).toBe(
			'mock-wallpaper'
		);
	});

	it('handles image upload and sets wallpaper', async () => {
		const mockBase64 = 'data:image/jpeg;base64,test';

		const file = new File(['test'], 'test.jpg', {
			type: 'image/jpeg'
		});
		const mockEvent = {
			target: { files: [file] }
		} as unknown as React.ChangeEvent<HTMLInputElement>;

		// Prepare a fake FileReader and manually call onloadend
		let onLoadEndCallback: () => void;

		const mockReader = {
			readAsDataURL: vi.fn(),
			result: mockBase64,
			onloadend: undefined as unknown as
				| null
				| (() => void)
		};

		Object.defineProperty(mockReader, 'onloadend', {
			set(cb) {
				onLoadEndCallback = cb;
			}
		});

		global.FileReader = vi.fn(
			() => mockReader as unknown as FileReader
		) as unknown as typeof FileReader;

		const { result } = renderHook(() => useWallpaper());

		await act(() => {
			result.current.uploadWallpaper(mockEvent);
			// Simulate FileReader.onloadend being triggered
			onLoadEndCallback();
		});

		expect(result.current.wallpaper).toContain(
			'data:image/jpeg;base64'
		);
		expect(localStorage.getItem('wallpaper')).toContain(
			'data:image/jpeg;base64'
		);
	});
});
