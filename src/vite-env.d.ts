/// <reference types="vite/client" />
import '@testing-library/jest-dom';

declare module 'vitest' {
	interface Assertion {
		toBeInTheDocument(): void;
	}
}
