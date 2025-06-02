import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Search from './Search';

describe('Search', () => {
  it('renders SearchInput', () => {
    const { container } = render(<Search />);
    expect(container.querySelector('input[type="search"]')).toBeInTheDocument();
  });
});