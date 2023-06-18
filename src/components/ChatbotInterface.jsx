import React, { useRef, useState, useEffect } from 'react';
import { AiFillCloseCircle, AiOutlineSend } from 'react-icons/ai';
import { UserMessage } from './UserMessage';
import { BotMessage } from './BotMessage';
import { BOOKS } from '../Books';

export const ChatbotInterface = (props) => {
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [isBotTyping, setIsBotTyping] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
    setIsBotTyping(true);

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
      content: `Set language to albanian \n You are a chatbot assistant who will help the user find a book according to his preferences \n Try to be as much polite as possible \n Book List: Hamleti-Shakespeare, Brenga Ballkanit-Edith Durham, Vepra 1,2,3-Ismail Kadare, Hyrje ne psikoanalize 1-Sigmund Freud, Hyrje ne psikoanalize 2-Sigmun Freud, Gjenerali i ushtrise se vdekur-Ismail Kadare, Kronike ne gur-Ismail ne Gur \n  Only reccomend books which are available in this list that i provided you.`,
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

        setIsBotTyping(false);
      });
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-10 right-10 h-96 w-60 bg-white border border-neutral-800 rounded-lg flex flex-col md:h-96 md:w-64">
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

        {isBotTyping && (
          <div className=" font-montserrat text-gray-500 text-xs italic">
            Chatbot-i po shkruan...
          </div>
        )}

        <div ref={messagesEndRef} />
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
