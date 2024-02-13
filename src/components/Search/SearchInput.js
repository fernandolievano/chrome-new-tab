import React from 'react';
import GoogleLogo from 'components/svg/GoogleLogo';
import useSearchInput from 'hooks/useSearchInput';

const GOOGLE_RED = '#DB4437';

const SearchInput = () => {
  const { handleInputChange, handleSearch } = useSearchInput();

  return (
    <div className="w-full h-full max-w-[600px] relative">
      <form onSubmit={handleSearch}>
        <input id='inputSearch' className="w-full h-16 pl-[64px] pr-[32px] py-4 rounded-full text-lg text-black" type="search" placeholder='Search' onChange={handleInputChange} required />
      </form>

      <GoogleLogo fill_color={GOOGLE_RED} />
    </div>
  );
};

export default SearchInput;