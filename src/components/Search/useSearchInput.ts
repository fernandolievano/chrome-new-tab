import React, { useState } from 'react';

const useSearchInput = () => {
	const [query, setQuery] = useState('');

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const encoded = new URLSearchParams({ q: query }).toString();

		window.location.replace(`https://www.google.com/search?${encoded}`);
	};

	return {
		handleInputChange,
		handleSearch
	};
};

export default useSearchInput;
