import React from 'react';
import logo from '/logo.png';

export const Navbar = () => {
  return (
    <div className="w-full h-24 px-4 mx-auto bg-cyan-900 flex justify-center ">
      <div className="flex items-center justify-center ">
        <img src={logo} className="w-16 sm:w-36" />
        <h1 className="font-montserrat font-semibold text-white text-center sm:text-2xl">
          Biblioteka Dhaskal Todri
        </h1>
      </div>
    </div>
  );
};
