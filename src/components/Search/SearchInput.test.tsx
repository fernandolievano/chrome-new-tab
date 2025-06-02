import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import SearchInput from './SearchInput';

// Mock hook
const mockHandleInput = vi.fn();
const mockHandleSearch = vi.fn();

vi.mock('./useSearchInput', () => ({
  default: () => ({
    handleInputChange: mockHandleInput,
    handleSearch: mockHandleSearch
  })
}));

describe('SearchInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input field and logo', () => {
    render(<SearchInput />);
    const input = screen.getByTestId('searchbox');
    expect(input).toBeInTheDocument();
  });

  it('calls handleInputChange and handleSearch', () => {
    render(<SearchInput />);
    const input = screen.getByTestId('searchbox');
    const form = input.closest('form');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(mockHandleInput).toHaveBeenCalled();

    fireEvent.submit(form!);
    expect(mockHandleSearch).toHaveBeenCalled();
  });
});
