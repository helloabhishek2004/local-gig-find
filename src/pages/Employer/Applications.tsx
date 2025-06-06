import React, { useState } from 'react';
import { Filter, Search, MapPin, Phone, MessageCircle, Star, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import MobileLayout from '@/components/Layout/MobileLayout';
import EmployerBottomNav from '@/components/Navigation/EmployerBottomNav';

interface Application {
  id: string;
  jobTitle: string;
  applicantName: string;
  location: string;
  distance: string;
  appliedDate: string;
  status: 'new' | 'reviewed' | 'shortlisted' | 'hired' | 'rejected';
  rating: number;
  hasResume: boolean;
  avatar?: string;
}

const Applications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const mockApplications: Application[] = [
    {
      id: '1',
      jobTitle: 'Restaurant Server',
      applicantName: 'Rajesh Kumar',
      location: 'Varkala, Kerala',
      distance: '2.3 km',
      appliedDate: '2 hours ago',
      status: 'new',
      rating: 4.8,
      hasResume: true
    },
    {
      id: '2',
      jobTitle: 'Delivery Boy',
      applicantName: 'Amit Sharma',
      location: 'Thiruvananthapuram',
      distance: '5.1 km',
      appliedDate: '1 day ago',
      status: 'reviewed',
      rating: 4.5,
      hasResume: false
    },
    {
      id: '3',
      jobTitle: 'Restaurant Server',
      applicantName: 'Priya Nair',
      location: 'Kollam, Kerala',
      distance: '8.2 km',
      appliedDate: '3 days ago',
      status: 'shortlisted',
      rating: 4.9,
      hasResume: true
    }
  ];

  const filters = [
    { id: 'all', label: 'All', count: mockApplications.length },
    { id: 'new', label: 'New', count: mockApplications.filter(app => app.status === 'new').length },
    { id: 'reviewed', label: 'Reviewed', count: mockApplications.filter(app => app.status === 'reviewed').length },
    { id: 'shortlisted', label: 'Shortlisted', count: mockApplications.filter(app => app.status === 'shortlisted').length },
  ];

  const getStatusColor = (status: Application['status']) => {
    switch (status) {
      case 'new': return 'bg-info/10 text-info';
      case 'reviewed': return 'bg-warning/10 text-warning';
      case 'shortlisted': return 'bg-success/10 text-success';
      case 'hired': return 'bg-primary/10 text-primary';
      case 'rejected': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const filteredApplications = mockApplications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || app.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <MobileLayout>
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 pt-safe px-4 py-6 bg-background/95 backdrop-blur-sm">
          <div className="max-w-sm mx-auto">
            <h1 className="text-2xl font-bold text-foreground">Applications</h1>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2 pb-24">
          <div className="max-w-sm mx-auto space-y-6">
            {/* Search and Filter */}
            <div className="relative mb-ios-md">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search applicants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 ios-input"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto category-scroll">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={cn(
                    "flex-shrink-0 px-ios-md py-ios-sm rounded-ios-lg text-ios-footnote font-medium transition-all duration-200",
                    selectedFilter === filter.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground hover:bg-accent/10"
                  )}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* Content */}
            {filteredApplications.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-ios-headline text-foreground mb-2">No applications found</h3>
                <p className="text-muted-foreground text-ios-callout">Applications will appear here when people apply to your jobs</p>
              </div>
            ) : (
              <div className="space-y-ios-md">
                {filteredApplications.map((application) => (
                  <div key={application.id} className="card-enhanced p-ios-lg ios-list-item">
                    <div className="flex items-start gap-ios-md mb-ios-md">
                      <div className="w-12 h-12 bg-primary/10 rounded-ios-lg flex items-center justify-center">
                        <span className="text-ios-body font-semibold text-primary">
                          {application.applicantName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-ios-xs">
                          <h3 className="font-semibold text-foreground text-ios-callout">{application.applicantName}</h3>
                          <Badge className={getStatusColor(application.status)}>
                            {application.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-ios-footnote mb-ios-xs">Applied for: {application.jobTitle}</p>
                        <div className="flex items-center gap-ios-sm text-muted-foreground text-ios-caption">
                          <div className="flex items-center gap-1">
                            <MapPin size={12} />
                            <span>{application.location}</span>
                          </div>
                          <span>•</span>
                          <span>{application.distance} away</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock size={12} />
                            <span>{application.appliedDate}</span>
                          </div>
                        </div>
                        {application.rating && (
                          <div className="flex items-center gap-1 mt-ios-xs">
                            <Star size={14} fill="currentColor" className="text-amber-500" />
                            <span className="text-ios-caption font-medium">{application.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-ios-sm">
                      <Button size="sm" variant="outline" className="flex-1 ios-button">
                        <Eye size={16} className="mr-1" />
                        View Profile
                      </Button>
                      <Button size="sm" variant="outline" className="ios-button">
                        <MessageCircle size={16} />
                      </Button>
                      <Button size="sm" variant="outline" className="ios-button">
                        <Phone size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <EmployerBottomNav />
      </div>
    </MobileLayout>
  );
};

export default Applications;
