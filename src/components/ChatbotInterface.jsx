import React, { useRef, useState } from 'react';
import { AiFillCloseCircle, AiOutlineSend } from 'react-icons/ai';
import { UserMessage } from './UserMessage';
import { BotMessage } from './BotMessage';

export const ChatbotInterface = (props) => {
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const inputValue = inputRef.current.value;

    if (inputValue.trim() !== '') {
      const message = {
        message: inputValue,
        sender: 'user',
      };

      setMessages([...messages, message]);

      sendRequest(message.message);

      inputRef.current.value = '';
    }
  };

  const sendRequest = (message) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer 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`,
    };
    const data = {
      model: 'text-davinci-003',
      messages: [{ role: 'user', content: message }],
    };

    axios.post(url, data, { headers: headers }).then((response) => {
      console.log(response);
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

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
      <div className="bg-gray-300 w-full h-5/6 flex flex-col py-2 px-2 mx-auto gap-2 overflow-x-auto">
        {messages.map((message, index) => {
          if (message.sender === 'user') {
            return <UserMessage message={message.message} key={index} />;
          } else if (message.sender === 'bot') {
            return <BotMessage message={message.message} key={index} />;
          }
        })}
      </div>
      <div className="flex h-8 justify-between items-center px-2 gap-2">
        <input
          type="text"
          placeholder="Dërgo një mesazh"
          className="w-full h-full bg-none outline-none border-none"
          ref={inputRef}
          onKeyPress={handleKeyPress}
        />
        <AiOutlineSend
          className="cursor-pointer"
          onClick={() => sendMessage()}
        />
      </div>
    </div>
  );
};
