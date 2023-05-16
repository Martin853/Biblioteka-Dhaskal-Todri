import React from 'react';

export const BookCard = (props) => {
  return (
    <div className="flex flex-col border border-black rounded-lg p-2 h-full shadow-xl">
      <h1 className=" font-montserrat text-sm sm:text-base">
        Titulli: {props.title}
      </h1>
      <h1 className=" font-montserrat text-sm sm:text-base">
        Autori: {props.author}
      </h1>
      <h1 className=" font-montserrat text-sm sm:text-base">
        Shtëpia Botuese: {props.publisher}
      </h1>
      <h1 className=" font-montserrat text-sm sm:text-base">
        Viti: {props.year}
      </h1>
    </div>
  );
};
