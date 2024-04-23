import React from 'react';
import SearchInput from 'components/Search/SearchInput';
import './search.css';

const Search = () => {
  return (
    <div className="w-full flex items-center justify-center z-10">
      <SearchInput />
    </div>
  );
};

export default Search;