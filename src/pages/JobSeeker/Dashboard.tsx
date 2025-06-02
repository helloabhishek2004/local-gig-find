
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeScreen from '@/components/Jobs/HomeScreen';
import BottomNav from '@/components/Navigation/BottomNavWithRouter';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleJobClick = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  return (
    <div className="relative min-h-screen">
      <HomeScreen onJobClick={handleJobClick} />
      <BottomNav />
    </div>
  );
};

export default Dashboard;
