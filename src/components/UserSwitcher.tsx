
import React from 'react';
import { Button } from '@/components/ui/button';
import UserAvatar from './UserAvatar';

interface User {
  id: string;
  name: string;
  isOnline: boolean;
}

interface UserSwitcherProps {
  users: User[];
  currentUser: User;
  onUserSwitch: (user: User) => void;
}

const UserSwitcher: React.FC<UserSwitcherProps> = ({ users, currentUser, onUserSwitch }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-3">Switch User</h3>
      <div className="flex gap-3">
        {users.map(user => (
          <Button
            key={user.id}
            variant={currentUser.id === user.id ? "default" : "outline"}
            className={`flex items-center gap-2 transition-all ${
              currentUser.id === user.id 
                ? 'bg-gradient-to-r from-romantic-500 to-pink-500 hover:from-romantic-600 hover:to-pink-600' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => onUserSwitch(user)}
          >
            <UserAvatar name={user.name} isOnline={user.isOnline} size="sm" />
            <span className="text-sm">{user.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default UserSwitcher;
