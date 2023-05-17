import React from 'react';
import logo from '/logo.png';
import { AiOutlineSearch } from 'react-icons/ai';

export const Navbar = (props) => {
  return (
    <div className="w-full h-36 sm:h-48 px-4 mx-auto bg-cyan-900 flex flex-col justify-center gap-4">
      <div className="flex items-center justify-center ">
        <img src={logo} className="w-16 sm:w-36" />
        <h1 className="font-montserrat font-semibold text-white text-center sm:text-2xl">
          Biblioteka Dhaskal Todri
        </h1>
      </div>
      <div className="w-full h-8 bg-white rounded-lg flex gap-2">
        <AiOutlineSearch size={'2rem'} className=" ml-2" />
        <input
          type="text"
          placeholder="Kërko për një libër"
          onChange={(event) => {
            props.setQuery(event.target.value);
          }}
          className="bg-transparent w-full outline-none font-montserrat"
        />
      </div>
    </div>
  );
};
