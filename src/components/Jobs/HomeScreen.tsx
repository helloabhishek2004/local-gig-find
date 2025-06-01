
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, MapPin, ChevronDown } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';
import JobCard from './JobCard';

interface HomeScreenProps {
  onJobClick: (jobId: string) => void;
}

const HomeScreen = ({ onJobClick }: HomeScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [selectedLocation, setSelectedLocation] = useState('Varkala, Kerala');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

  const locations = [
    'Varkala, Kerala',
    'Trivandrum, Kerala', 
    'Kollam, Kerala',
    'Kochi, Kerala',
    'Kozhikode, Kerala'
  ];

  const categories = ['All', 'Restaurant', 'Delivery', 'Retail', 'Events', 'Helper'];

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
      isSaved: false,
      category: 'Restaurant'
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
      isSaved: false,
      category: 'Delivery'
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
      isSaved: false,
      category: 'Events'
    },
    {
      id: '5',
      title: 'Kitchen Helper',
      company: 'Hotel Paradise',
      location: 'North Cliff',
      distance: '900 m',
      pay: '250',
      payType: 'daily' as const,
      postedTime: '3h ago',
      isSaved: false,
      category: 'Restaurant'
    },
    {
      id: '6',
      title: 'House Cleaner',
      company: 'Home Services',
      location: 'Sivagiri',
      distance: '2.3 km',
      pay: '400',
      payType: 'fixed' as const,
      postedTime: '5h ago',
      isSaved: false,
      category: 'Helper'
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

  const filteredJobs = useMemo(() => {
    return mockJobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           job.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    }).map(job => ({
      ...job,
      isSaved: savedJobs.has(job.id) || job.isSaved
    }));
  }, [mockJobs, searchQuery, selectedCategory, savedJobs]);

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 bg-background border-b">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Find Jobs</h1>
              <div className="flex items-center text-muted-foreground text-sm mt-2">
                <MapPin size={16} className="mr-2" />
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="border-none p-0 h-auto bg-transparent text-muted-foreground hover:text-foreground transition-colors">
                    <div className="flex items-center">
                      <SelectValue />
                      <ChevronDown size={14} className="ml-1" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-semibold text-lg">👤</span>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-muted/30 border-border rounded-xl text-base"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 border-border rounded-xl"
            >
              <Filter size={20} />
            </Button>
          </div>
        </div>

        {/* Job Categories - Quick Filters */}
        <div className="px-6 py-4 border-b">
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  category === selectedCategory
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Available Jobs</h2>
              <span className="text-muted-foreground text-sm">{filteredJobs.length} jobs found</span>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-foreground mb-2">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="space-y-4">
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

export default HomeScreen;
