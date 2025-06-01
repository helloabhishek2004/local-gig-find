
import React from 'react';
import { MapPin, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    distance: string;
    pay: string;
    payType: 'hourly' | 'daily' | 'fixed';
    postedTime: string;
    isUrgent?: boolean;
    isSaved?: boolean;
  };
  onJobClick: (jobId: string) => void;
  onSaveToggle: (jobId: string) => void;
}

const JobCard = ({ job, onJobClick, onSaveToggle }: JobCardProps) => {
  return (
    <div 
      className="bg-card rounded-xl p-4 border shadow-sm active:scale-98 transition-transform cursor-pointer"
      onClick={() => onJobClick(job.id)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          {job.isUrgent && (
            <span className="inline-block bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full mb-2 font-medium">
              Urgent
            </span>
          )}
          <h3 className="font-semibold text-foreground text-base leading-tight">
            {job.title}
          </h3>
          <p className="text-muted-foreground text-sm mt-1">{job.company}</p>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSaveToggle(job.id);
          }}
          className="text-muted-foreground hover:text-accent transition-colors p-1"
        >
          {job.isSaved ? (
            <BookmarkCheck size={20} className="text-accent" />
          ) : (
            <Bookmark size={20} />
          )}
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin size={16} className="mr-2" />
          <span>{job.location} • {job.distance}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-primary font-semibold">
            <span className="text-lg">₹{job.pay}</span>
            <span className="text-sm text-muted-foreground ml-1">
              /{job.payType === 'hourly' ? 'hr' : job.payType === 'daily' ? 'day' : 'total'}
            </span>
          </div>

          <div className="flex items-center text-muted-foreground text-xs">
            <Clock size={14} className="mr-1" />
            <span>{job.postedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
