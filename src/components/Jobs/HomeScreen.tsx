
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MapPin, ChevronDown } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';
import JobCard from './JobCard';

interface HomeScreenProps {
  onJobClick: (jobId: string) => void;
}

const HomeScreen = ({ onJobClick }: HomeScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const mockJobs = [
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
      isSaved: false
    },
    {
      id: '2',
      title: 'Delivery Boy',
      company: 'Local Grocery Store',
      location: 'Temple Junction',
      distance: '800 m',
      pay: '80',
      payType: 'hourly' as const,
      postedTime: '4h ago',
      isSaved: false
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
      isSaved: true
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
      isSaved: false
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

  const jobsWithSaveState = mockJobs.map(job => ({
    ...job,
    isSaved: savedJobs.has(job.id) || job.isSaved
  }));

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 bg-background border-b">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold text-foreground">Find Jobs</h1>
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin size={14} className="mr-1" />
                <span>Varkala, Kerala</span>
                <ChevronDown size={14} className="ml-1" />
              </div>
            </div>
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold">👤</span>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-muted/50"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 border-muted"
            >
              <Filter size={20} />
            </Button>
          </div>
        </div>

        {/* Job Categories - Quick Filters */}
        <div className="p-4 border-b">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {['All', 'Restaurant', 'Delivery', 'Retail', 'Events', 'Helper'].map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                  category === 'All' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Available Jobs</h2>
              <span className="text-muted-foreground text-sm">{jobsWithSaveState.length} jobs found</span>
            </div>

            <div className="space-y-4">
              {jobsWithSaveState.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onJobClick={onJobClick}
                  onSaveToggle={handleSaveToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default HomeScreen;
