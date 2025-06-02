
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JobDetailsScreen from '@/components/Jobs/JobDetailsScreen';

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleApply = () => {
    console.log('Applied for job:', jobId);
    // Show success message or navigate to application confirmation
  };

  return (
    <JobDetailsScreen 
      jobId={jobId!}
      onBack={handleBack}
      onApply={handleApply}
    />
  );
};

export default JobDetails;
