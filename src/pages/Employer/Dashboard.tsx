
import React, { useState } from 'react';
import { Plus, Users, MessageCircle, TrendingUp, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MobileLayout from '@/components/Layout/MobileLayout';
import EmployerBottomNav from '@/components/Navigation/EmployerBottomNav';
import { useNavigate } from 'react-router-dom';

interface JobPost {
  id: string;
  title: string;
  status: 'active' | 'pending' | 'closed' | 'draft';
  views: number;
  applications: number;
  postedDate: string;
  salary: string;
  type: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [greeting] = useState(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  });

  const stats = [
    { 
      label: 'Active Jobs', 
      value: '3', 
      icon: TrendingUp, 
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      onClick: () => navigate('/employer/applications')
    },
    { 
      label: 'Total Views', 
      value: '147', 
      icon: Eye, 
      color: 'text-info',
      bgColor: 'bg-info/10',
      onClick: () => navigate('/employer/applications')
    },
    { 
      label: 'Applications', 
      value: '23', 
      icon: Users, 
      color: 'text-success',
      bgColor: 'bg-success/10',
      onClick: () => navigate('/employer/applications')
    },
    { 
      label: 'Messages', 
      value: '8', 
      icon: MessageCircle, 
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      onClick: () => navigate('/employer/chat')
    },
  ];

  const recentJobs: JobPost[] = [
    {
      id: '1',
      title: 'Restaurant Server',
      status: 'active',
      views: 45,
      applications: 8,
      postedDate: '2 days ago',
      salary: '₹15,000/month',
      type: 'Full-time'
    },
    {
      id: '2',
      title: 'Delivery Boy',
      status: 'active',
      views: 67,
      applications: 12,
      postedDate: '1 week ago',
      salary: '₹12,000/month',
      type: 'Part-time'
    },
    {
      id: '3',
      title: 'Kitchen Helper',
      status: 'pending',
      views: 35,
      applications: 3,
      postedDate: '3 days ago',
      salary: '₹10,000/month',
      type: 'Full-time'
    }
  ];

  const getStatusColor = (status: JobPost['status']) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success';
      case 'pending': return 'bg-warning/10 text-warning';
      case 'closed': return 'bg-muted/10 text-muted-foreground';
      case 'draft': return 'bg-info/10 text-info';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const getStatusIcon = (status: JobPost['status']) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'pending': return Clock;
      case 'closed': return AlertCircle;
      case 'draft': return Clock;
      default: return Clock;
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background relative">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/2 -z-10" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -z-10" />
        
        {/* Header */}
        <div className="flex-shrink-0 px-ios-md pt-ios-lg pb-ios-sm ios-navbar safe-area-top">
          <div className="mb-ios-lg">
            <h1 className="text-ios-title1 font-bold text-foreground mb-ios-xs">{greeting}! 👋</h1>
            <p className="text-muted-foreground text-ios-callout">Beach Cafe Varkala</p>
          </div>

          {/* Quick Post Job Button */}
          <Button 
            onClick={() => navigate('/employer/post-job')}
            className="w-full btn-accent ios-button h-14 text-ios-callout font-semibold shadow-ios-lg"
          >
            <Plus size={20} className="mr-2" />
            Post a New Job
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 px-ios-md py-ios-sm pb-24 overflow-y-auto">
          <div className="max-w-sm mx-auto space-y-ios-lg">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-ios-md animate-fade-in">
              {stats.map((stat, index) => (
                <button
                  key={index}
                  onClick={stat.onClick}
                  className="card-enhanced p-ios-lg ios-list-item group"
                >
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-ios-lg flex items-center justify-center mb-ios-md group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon size={24} className={stat.color} />
                  </div>
                  <div className={`text-ios-title2 font-bold ${stat.color} mb-ios-xs`}>{stat.value}</div>
                  <div className="text-ios-caption text-muted-foreground">{stat.label}</div>
                </button>
              ))}
            </div>

            {/* Recent Job Posts */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-ios-md">
                <h2 className="text-ios-headline font-semibold text-foreground">Recent Job Posts</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/employer/applications')}
                  className="text-primary hover:bg-primary/10 ios-button"
                >
                  View All
                </Button>
              </div>

              <div className="space-y-ios-sm">
                {recentJobs.map((job) => {
                  const StatusIcon = getStatusIcon(job.status);
                  return (
                    <button
                      key={job.id}
                      onClick={() => navigate('/employer/applications')}
                      className="w-full card-enhanced p-ios-lg ios-list-item text-left group"
                    >
                      <div className="flex items-start justify-between mb-ios-md">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-ios-callout mb-ios-xs group-hover:text-primary transition-colors">{job.title}</h3>
                          <div className="flex items-center gap-ios-sm text-muted-foreground text-ios-caption">
                            <span>{job.salary}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                            <span>•</span>
                            <span>{job.postedDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-ios-xs">
                          <Badge className={getStatusColor(job.status)}>
                            <StatusIcon size={12} className="mr-1" />
                            {job.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-ios-lg text-ios-caption text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye size={14} />
                            <span>{job.views} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users size={14} />
                            <span>{job.applications} applications</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-ios-headline font-semibold text-foreground mb-ios-md">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-ios-sm">
                <button 
                  onClick={() => navigate('/employer/applications')}
                  className="card-enhanced p-ios-lg ios-list-item group"
                >
                  <Users size={24} className="text-primary mb-ios-sm group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-ios-footnote font-medium text-foreground">View Applications</span>
                </button>
                <button 
                  onClick={() => navigate('/employer/chat')}
                  className="card-enhanced p-ios-lg ios-list-item group"
                >
                  <MessageCircle size={24} className="text-accent mb-ios-sm group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-ios-footnote font-medium text-foreground">Messages</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <EmployerBottomNav />
      </div>
    </MobileLayout>
  );
};

export default Dashboard;
