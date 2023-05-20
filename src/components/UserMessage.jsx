import React from 'react';

export const UserMessage = (props) => {
  return (
    <div className="bg-white w-4/5 h-fit p-2 place-self-end rounded-md">
      {props.message}
    </div>
  );
};
