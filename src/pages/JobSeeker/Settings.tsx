
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsScreen from '@/components/Settings/SettingsScreen';

const Settings = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/jobseeker/profile');
  };

  return (
    <SettingsScreen onBack={handleBack} />
  );
};

export default Settings;
