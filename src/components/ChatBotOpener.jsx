import React, { useState } from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { ChatbotInterface } from './ChatbotInterface';

export const ChatBotOpener = () => {
  const [chatVisible, setChatVisible] = useState(false);

  return (
    <div>
      {!chatVisible ? (
        <BsFillChatDotsFill
          className="fixed bottom-5 right-5 sm:bottom-10 sm:right-10 cursor-pointer"
          size={'3em'}
          color="#164e63"
          onClick={() => setChatVisible(true)}
        />
      ) : (
        <ChatbotInterface setChatVisible={setChatVisible} />
      )}
    </div>
  );
};
