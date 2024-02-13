import React from 'react';
import GoogleLogo from 'components/svg/GoogleLogo';

const GOOGLE_RED = '#DB4437';

const SearchInput = () => (
  <div className="w-full h-full max-w-[600px] relative">
    <input className="w-full h-16 pl-[64px] pr-[32px] py-4 rounded-full text-lg text-black" type="text" placeholder='Search' />

    <GoogleLogo fill_color={GOOGLE_RED} />
  </div>
);

export default SearchInput;