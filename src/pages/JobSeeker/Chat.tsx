
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChatScreen from '@/components/Chat/ChatScreen';
import BottomNavWithRouter from '@/components/Navigation/BottomNavWithRouter';

const Chat = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/jobseeker/dashboard');
  };

  return (
    <div className="relative min-h-screen">
      <ChatScreen onBack={handleBack} />
      <BottomNavWithRouter />
    </div>
  );
};

export default Chat;
