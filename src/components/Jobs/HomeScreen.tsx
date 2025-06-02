import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, MapPin, ChevronDown, Briefcase } from 'lucide-react';
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
      <div className="flex flex-col h-screen bg-background">
        {/* Fixed Header */}
        <div className="flex-shrink-0 px-6 pt-8 pb-6 bg-gradient-to-b from-primary/5 to-background">
          <div className="flex items-center justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-2">Find Jobs</h1>
              
              {/* Location selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{selectedLocation}</span>
                  <ChevronDown size={14} className="ml-1" />
                </button>
                
                {showLocationDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-lg z-50">
                    {locations.map((location) => (
                      <button
                        key={location}
                        onClick={() => {
                          setSelectedLocation(location);
                          setShowLocationDropdown(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-muted/50 first:rounded-t-xl last:rounded-b-xl transition-colors"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center shadow-sm">
              <Briefcase size={24} className="text-primary" />
            </div>
          </div>

          {/* Enhanced Search and Filter */}
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" />
              <Input
                placeholder="Search jobs, companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-card/50 backdrop-blur-sm border-border/50 rounded-2xl text-base shadow-sm focus:shadow-md transition-all"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-14 w-14 border-border/50 rounded-2xl bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all"
            >
              <Filter size={20} />
            </Button>
          </div>
        </div>

        {/* Fixed Job Categories - no scrollbar */}
        <div className="flex-shrink-0 px-6 py-4 bg-background/95 backdrop-blur-sm border-b border-border/50">
          <div className="flex space-x-3 overflow-x-auto overflow-y-hidden scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all duration-300 shadow-sm flex-shrink-0 ${
                  category === selectedCategory
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                    : 'bg-card/80 text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-105'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Jobs List with bottom padding for nav */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Available Jobs</h2>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground text-sm">{filteredJobs.length} jobs</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-foreground mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-4 pb-24">
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
