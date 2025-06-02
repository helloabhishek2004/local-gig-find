
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SavedJobsScreen from '@/components/Jobs/SavedJobsScreen';
import BottomNavWithRouter from '@/components/Navigation/BottomNavWithRouter';

const SavedJobs = () => {
  const navigate = useNavigate();

  const handleJobClick = (jobId: string) => {
    navigate(`/job/${jobId}`);
  };

  return (
    <div className="relative min-h-screen">
      <SavedJobsScreen onJobClick={handleJobClick} />
      <BottomNavWithRouter />
    </div>
  );
};

export default SavedJobs;
