import React from 'react';
import DollarList from './DollarList';

const Dollar = () => {
  return (
    <div id="dollar" className="bg-white fixed bottom-0 left-0 w-full  flex flex-shrink-0 items-stretch justify-start">
      <h1 className="font-bold uppercase bg-[#0F9D58] text-green-300 py-1 px-3 flex items-center">Dólar</h1>
      <DollarList />
    </div>
  );
};


export default Dollar;