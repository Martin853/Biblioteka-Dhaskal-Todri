import React from 'react';

export const BotMessage = (props) => {
  return (
    <div className="bg-white w-4/5 h-fit p-2 place-self-start rounded-md font-montserrat">
      {props.message}
    </div>
  );
};
