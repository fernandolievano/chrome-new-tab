import React from 'react';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Clock from './Clock';

vi.mock('./useClock', () => ({
	__esModule: true,
	default: () => ({
		prettifiedTime: '14:05'
	})
}));

describe('Clock Component', () => {
	it('renders the current time from useClock', () => {
		render(<Clock />);

		const timeElement = screen.getByText('14:05');

		expect(timeElement).toBeInTheDocument();
		expect(timeElement).toHaveAttribute(
			'aria-label',
			'Current time is 14:05'
		);
	});

	it('has correct styling classes', () => {
		render(<Clock />);

		const timeElement = screen.getByText('14:05');

		expect(timeElement).toHaveClass('clock-time');
		expect(timeElement).toHaveClass('select-none');
		expect(timeElement).toHaveClass('text-6xl');
		expect(timeElement).toHaveClass('md:text-9xl');
		expect(timeElement).toHaveClass('font-light');
	});
});
