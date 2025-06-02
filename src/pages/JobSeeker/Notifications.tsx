
import React from 'react';
import AlertsScreen from '@/components/Alerts/AlertsScreen';
import BottomNavWithRouter from '@/components/Navigation/BottomNavWithRouter';

const Notifications = () => {
  return (
    <div className="relative min-h-screen">
      <AlertsScreen />
      <BottomNavWithRouter />
    </div>
  );
};

export default Notifications;
