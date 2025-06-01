import { vi, describe, it, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Wallpaper from './Wallpaper';


// Global Mock Setup
const mockUpload = vi.fn();

vi.mock('./useWallpaper', () => ({
  default: () => ({
    wallpaper: 'mock-wallpaper.jpg',
    uploadWallpaper: mockUpload
  })
}));

describe('Wallpaper Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the wallpaper image', () => {
    render(<Wallpaper />);
    const image = screen.getByAltText('New Tab Wallpaper') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mock-wallpaper.jpg');
  });

  it('has a hidden file input and visible label that opens it', () => {
    render(<Wallpaper />);
    const input = screen.getByLabelText('Edit background');
    expect(input).toBeInTheDocument();
  });

  it('calls uploadWallpaper on file selection', () => {
    render(<Wallpaper />);

    const fileInput = screen.getByLabelText('Edit background') as HTMLInputElement;

    const file = new File(['dummy'], 'wallpaper.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, {
      target: { files: [file] }
    });

    expect(mockUpload).toHaveBeenCalledTimes(1);
    expect(mockUpload.mock.calls[0][0].target.files[0]).toEqual(file);
  });
});