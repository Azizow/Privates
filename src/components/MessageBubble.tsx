
import React from 'react';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex mb-4 animate-fade-in ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow-sm ${
        isOwnMessage 
          ? 'bg-gradient-to-r from-romantic-500 to-pink-500 text-white' 
          : 'bg-white border border-gray-200 text-gray-800'
      }`}>
        <p className="text-sm">{message.text}</p>
        <p className={`text-xs mt-1 ${
          isOwnMessage ? 'text-pink-100' : 'text-gray-500'
        }`}>
          {formatTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
