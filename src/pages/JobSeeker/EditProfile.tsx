
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfileScreen from '@/components/Profile/EditProfileScreen';

const EditProfile = () => {
  const navigate = useNavigate();

  const handleSave = () => {
    navigate('/jobseeker/profile');
  };

  const handleBack = () => {
    navigate('/jobseeker/profile');
  };

  return (
    <EditProfileScreen onSave={handleSave} onBack={handleBack} />
  );
};

export default EditProfile;
