
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, Upload } from 'lucide-react';

interface ProfileCompletenessIndicatorProps {
  completionData: {
    profilePhoto: boolean;
    basicInfo: boolean;
    skills: boolean;
    resume: boolean;
    bio: boolean;
  };
}

const ProfileCompletenessIndicator = ({ completionData }: ProfileCompletenessIndicatorProps) => {
  const items = [
    { key: 'profilePhoto', label: 'Profile Photo', icon: CheckCircle },
    { key: 'basicInfo', label: 'Basic Information', icon: CheckCircle },
    { key: 'skills', label: 'Skills & Expertise', icon: CheckCircle },
    { key: 'resume', label: 'Resume Upload', icon: Upload },
    { key: 'bio', label: 'About Me', icon: CheckCircle },
  ];

  const completedItems = Object.values(completionData).filter(Boolean).length;
  const totalItems = items.length;
  const percentage = Math.round((completedItems / totalItems) * 100);

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Profile Completeness</h3>
        <span className="text-lg font-bold text-primary">{percentage}%</span>
      </div>
      
      <Progress value={percentage} className="h-3 mb-4" />
      
      <div className="space-y-3">
        {items.map((item) => {
          const isCompleted = completionData[item.key as keyof typeof completionData];
          const Icon = isCompleted ? CheckCircle : AlertCircle;
          
          return (
            <div key={item.key} className="flex items-center gap-3">
              <Icon 
                size={18} 
                className={isCompleted ? 'text-success' : 'text-muted-foreground'} 
              />
              <span className={`text-sm ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      
      {percentage < 100 && (
        <p className="text-xs text-muted-foreground mt-4">
          Complete your profile to improve visibility to employers
        </p>
      )}
    </div>
  );
};

export default ProfileCompletenessIndicator;
