
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileScreen from '@/components/Profile/ProfileScreen';
import BottomNavWithRouter from '@/components/Navigation/BottomNavWithRouter';

const Profile = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/jobseeker/profile/edit');
  };

  const handleSettings = () => {
    navigate('/jobseeker/settings');
  };

  return (
    <div className="relative min-h-screen">
      <ProfileScreen 
        onEditProfile={handleEditProfile}
        onSettings={handleSettings}
      />
      <BottomNavWithRouter />
    </div>
  );
};

export default Profile;
