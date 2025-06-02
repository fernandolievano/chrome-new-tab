import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import useSearchInput from './useSearchInput';
import type React from 'react';

describe('useSearchInput', () => {
	const mockReplace = vi.fn();

	beforeEach(() => {
		vi.restoreAllMocks();

		vi.stubGlobal('location', {
			...window.location,
			replace: mockReplace
		});
	});

	it('updates query on input change', () => {
		const { result } = renderHook(() => useSearchInput());

		result.current.handleInputChange({
			target: { value: 'vitest unit testing tutorial' }
		} as React.ChangeEvent<HTMLInputElement>);

		// Nothing to assert directly since query is internal,
		// but we ensure no crash and simulate the flow.
	});

	it('redirects to Google on form submission', () => {
		const { result } = renderHook(() => useSearchInput());

		act(() => {
			result.current.handleInputChange({
				target: { value: 'vitest' }
			} as React.ChangeEvent<HTMLInputElement>);
		});

		act(() => {
			result.current.handleSearch({
				preventDefault: vi.fn()
			} as unknown as React.FormEvent<HTMLFormElement>);
		});

		expect(mockReplace).toHaveBeenCalledWith(
			'https://www.google.com/search?q=vitest'
		);
	});
});
