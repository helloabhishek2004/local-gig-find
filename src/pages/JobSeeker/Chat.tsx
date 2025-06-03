
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatScreen from '@/components/Chat/ChatScreen';
import BottomNavWithRouter from '@/components/Navigation/BottomNavWithRouter';

const Chat = () => {
  const navigate = useNavigate();
  const [showBottomNav, setShowBottomNav] = useState(true);

  const handleBack = () => {
    navigate('/jobseeker/dashboard');
  };

  const hideBottomNav = () => {
    setShowBottomNav(false);
  };

  const showBottomNavigation = () => {
    setShowBottomNav(true);
  };

  return (
    <div className="relative min-h-screen">
      <ChatScreen 
        onBack={handleBack} 
        hideBottomNav={hideBottomNav}
        showBottomNav={showBottomNavigation}
      />
      {showBottomNav && <BottomNavWithRouter />}
    </div>
  );
};

export default Chat;
