
import React from 'react';

interface UserAvatarProps {
  name: string;
  isOnline: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, isOnline, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl'
  };

  const dotSizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getAvatarColor = (name: string) => {
    return name.toLowerCase() === 'azizow' 
      ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
      : 'bg-gradient-to-br from-pink-500 to-romantic-600';
  };

  return (
    <div className="relative">
      <div className={`${sizeClasses[size]} ${getAvatarColor(name)} rounded-full flex items-center justify-center text-white font-semibold shadow-lg`}>
        {getInitials(name)}
      </div>
      <div className={`absolute -bottom-1 -right-1 ${dotSizeClasses[size]} rounded-full border-2 border-white shadow-sm ${
        isOnline ? 'bg-green-500' : 'bg-gray-400'
      }`} />
    </div>
  );
};

export default UserAvatar;
