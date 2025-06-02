import type { Mock } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect, afterEach } from 'vitest';
import useCheckConnection from './useCheckConnection';

describe('useCheckConnection', () => {
	let originalNavigatorOnline: boolean;

	let mockFetch: Mock;

	beforeEach(() => {
		originalNavigatorOnline = navigator.onLine;

		Object.defineProperty(navigator, 'onLine', {
			configurable: true,
			value: true
		});

		mockFetch = vi.fn();
		global.fetch = mockFetch as unknown as typeof fetch;
	});

	afterEach(() => {
		Object.defineProperty(navigator, 'onLine', {
			configurable: true,
			value: originalNavigatorOnline
		});

		vi.restoreAllMocks();
	});

	it('sets isOnline to false when navigator is offline', async () => {
		Object.defineProperty(navigator, 'onLine', {
			configurable: true,
			value: false
		});

		const { result } = renderHook(() => useCheckConnection());

		await waitFor(() => {
			expect(result.current.isOnline).toBe(false);
		});
	});

	it('sets isOnline to false when fetch returns !ok', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: false
		});

		const { result } = renderHook(() => useCheckConnection());

		await waitFor(() => {
			expect(result.current.isOnline).toBe(false);
		});
	});
	it('sets isOnline to false when fetch throws an error', async () => {
		mockFetch.mockRejectedValueOnce(new Error('network error'));

		const { result } = renderHook(() => useCheckConnection());

		await waitFor(() => {
			expect(result.current.isOnline).toBe(false);
		});
	});

	it('sets isOnline to true when fetch returns ok', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true
		});

		const { result } = renderHook(() => useCheckConnection());

		await waitFor(() => {
			expect(result.current.isOnline).toBe(true);
		});
	});
});
