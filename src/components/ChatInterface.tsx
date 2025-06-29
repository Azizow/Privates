
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import UserAvatar from './UserAvatar';
import MessageBubble from './MessageBubble';
import UserSwitcher from './UserSwitcher';
import { MessageCircle } from 'lucide-react';

interface User {
  id: string;
  name: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [users] = useState<User[]>([
    { id: '1', name: 'Azizow', isOnline: true },
    { id: '2', name: 'Salwa', isOnline: true }
  ]);

  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey beautiful! How was your day? ❤️',
      sender: 'Azizow',
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: '2',
      text: 'Aww, it was good! Missing you though 🥰',
      sender: 'Salwa',
      timestamp: new Date(Date.now() - 1000 * 60 * 25) // 25 minutes ago
    },
    {
      id: '3',
      text: 'I miss you too! Can\'t wait to see you tonight 💕',
      sender: 'Azizow',
      timestamp: new Date(Date.now() - 1000 * 60 * 20) // 20 minutes ago
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: currentUser.name,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const otherUser = users.find(user => user.id !== currentUser.id);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-romantic-500 to-pink-500 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar name={otherUser?.name || ''} isOnline={otherUser?.isOnline || false} size="md" />
            <div>
              <h2 className="font-semibold text-lg">{otherUser?.name}</h2>
              <p className="text-pink-100 text-sm">
                {otherUser?.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <MessageCircle className="w-6 h-6" />
        </div>
      </div>

      {/* User Switcher */}
      <div className="p-4">
        <UserSwitcher 
          users={users}
          currentUser={currentUser}
          onUserSwitch={setCurrentUser}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 pb-4 max-h-96 overflow-y-auto">
        <div className="space-y-1">
          {messages.map(message => (
            <MessageBubble 
              key={message.id}
              message={message}
              isOwnMessage={message.sender === currentUser.name}
            />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-white border-t p-4 shadow-lg">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${otherUser?.name}...`}
            className="flex-1 rounded-full border-gray-300 focus:border-romantic-500 focus:ring-romantic-500"
          />
          <Button 
            onClick={handleSendMessage}
            className="rounded-full bg-gradient-to-r from-romantic-500 to-pink-500 hover:from-romantic-600 hover:to-pink-600 px-6"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
