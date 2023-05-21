import React, { useRef, useState } from 'react';
import { AiFillCloseCircle, AiOutlineSend } from 'react-icons/ai';
import { UserMessage } from './UserMessage';
import { BotMessage } from './BotMessage';
import { BOOKS } from '../Books';

const bookList = BOOKS;

export const ChatbotInterface = (props) => {
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    const inputValue = inputRef.current.value;

    if (inputValue.trim() !== '') {
      const message = {
        message: inputValue,
        sender: 'user',
      };

      const newMessages = [...messages, message];

      setMessages(newMessages);

      inputRef.current.value = '';

      await proccesMessage(newMessages);
    }
  };

  async function proccesMessage(chatMessage) {
    let apiMessages = chatMessage.map((messageObject) => {
      let role = '';
      if (messageObject.sender === 'ChatGPT') {
        role = 'assistant';
      } else {
        role = 'user';
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      role: 'system',
      content: `Set language to albanian \n You are a chatbot assistant who will help the user find a book according to his preferences \n Try to be as much polite as possible \n Book List: ${BOOKS}\n Only reccomend books which are available in this list.`,
    };

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    };

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + import.meta.env.VITE_OPEN_AI_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setMessages([
          ...chatMessage,
          {
            message: data.choices[0].message.content,
            sender: 'bot',
          },
        ]);
      });
  }

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
        <AiOutlineSend className="cursor-pointer" onClick={sendMessage} />
      </div>
    </div>
  );
};
