
import React, { useState } from 'react';
import { Bookmark, Search, Filter, MapPin, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MobileLayout from '@/components/Layout/MobileLayout';
import JobCard from './JobCard';

interface SavedJobsScreenProps {
  onJobClick: (jobId: string) => void;
}

const SavedJobsScreen = ({ onJobClick }: SavedJobsScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set(['1', '3', '4']));

  const mockSavedJobs = [
    {
      id: '1',
      title: 'Restaurant Server',
      company: 'Beach Cafe Varkala',
      location: 'Varkala Beach',
      distance: '1.2 km',
      pay: '300',
      payType: 'daily' as const,
      postedTime: '2h ago',
      isUrgent: true,
      isSaved: true,
      category: 'Restaurant'
    },
    {
      id: '3',
      title: 'Shop Assistant',
      company: 'Spice Market',
      location: 'Main Market',
      distance: '1.5 km',
      pay: '400',
      payType: 'daily' as const,
      postedTime: '1d ago',
      isSaved: true,
      category: 'Retail'
    },
    {
      id: '4',
      title: 'Event Helper',
      company: 'Wedding Planners',
      location: 'Convention Hall',
      distance: '2.1 km',
      pay: '1500',
      payType: 'fixed' as const,
      postedTime: '2d ago',
      isSaved: true,
      category: 'Events'
    }
  ];

  const handleSaveToggle = (jobId: string) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const filteredJobs = mockSavedJobs.filter(job => 
    savedJobs.has(job.id) && 
    (job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     job.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 p-4 bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Saved Jobs</h1>
              <p className="text-muted-foreground mt-1">{filteredJobs.length} jobs saved</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <Bookmark size={20} className="text-accent" />
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" />
            <Input
              placeholder="Search saved jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-muted/30 border-border/50 rounded-xl"
            />
          </div>
        </div>

        {/* Scrollable Jobs List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-20">
          <div className="p-4">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📌</div>
                <h3 className="text-lg font-medium text-foreground mb-2">No saved jobs</h3>
                <p className="text-muted-foreground mb-6 px-4">Save jobs you're interested in to find them easily later</p>
                <Button onClick={() => window.history.back()}>
                  Browse Jobs
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onJobClick={onJobClick}
                    onSaveToggle={handleSaveToggle}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SavedJobsScreen;
