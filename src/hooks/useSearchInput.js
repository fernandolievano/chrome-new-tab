import { useState } from 'react';

const useSearchInput = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault();

    window.location.replace(`https://www.google.com/search?q=${query}`);
  };

  return { handleInputChange, handleSearch };
};

export default useSearchInput;