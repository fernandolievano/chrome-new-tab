import React from 'react';
import DollarList from './DollarList';

const Dollar = () => {
  return (
    <div id="dollar" className="bg-white bg-opacity-10 fixed bottom-0 left-0 w-full  flex flex-shrink-0 items-stretch justify-start backdrop-blur-sm">
      <h1 className="font-bold uppercase bg-black bg-opacity-20 text-gree py-1 px-4 md:px-8 flex items-center">Dólar</h1>

      <DollarList />
    </div>
  );
};


export default Dollar;