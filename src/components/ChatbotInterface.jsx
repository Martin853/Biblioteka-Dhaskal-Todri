import React from 'react';
import { AiFillCloseCircle, AiOutlineSend } from 'react-icons/ai';

export const ChatbotInterface = (props) => {
  return (
    <div className="fixed bottom-10 right-10 h-80 w-52 bg-white border border-neutral-800 rounded-lg flex flex-col md:h-96 md:w-64">
      <div className="w-full h-10 bg-cyan-900 flex justify-between items-center px-2 mx-auto rounded-t-md">
        <h1 className="font-montserrat text-white text-lg font-semibold">
          ChatBot
        </h1>
        <AiFillCloseCircle
          color="white"
          size="1.5rem"
          className="cursor-pointer"
          onClick={() => props.setChatVisible(false)}
        />
      </div>
      <div className="bg-gray-300 w-full h-5/6 flex flex-col"></div>
      <div className="flex h-8 justify-between items-center px-2 gap-2">
        <input
          type="text"
          placeholder="Dërgo një mesazh"
          className="w-full h-full bg-none outline-none border-none"
        />
        <AiOutlineSend className="cursor-pointer" />
      </div>
    </div>
  );
};
