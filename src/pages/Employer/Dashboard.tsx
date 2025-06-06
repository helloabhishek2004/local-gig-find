import React, { useState } from 'react';
import { Plus, Users, MessageCircle, TrendingUp, Eye, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 pt-safe px-4 py-6 bg-background/95 backdrop-blur-sm">
          <div className="max-w-sm mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-2">{greeting}! 👋</h1>
            <p className="text-muted-foreground text-lg">Beach Cafe Varkala</p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2 pb-24">
          <div className="max-w-sm mx-auto space-y-6">
            {/* Quick Post Job Button */}
            <Button 
              onClick={() => navigate('/employer/post-job')}
              className="w-full btn-primary h-14 text-base font-semibold shadow-lg animate-fade-in"
            >
              <Plus size={20} className="mr-2" />
              Post a New Job
            </Button>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {stats.map((stat, index) => (
                <button
                  key={index}
                  onClick={stat.onClick}
                  className="card-enhanced p-4 ios-list-item group"
                >
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                    <stat.icon size={24} className={stat.color} />
                  </div>
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </button>
              ))}
            </div>

            {/* Recent Job Posts */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Recent Job Posts</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate('/employer/applications')}
                  className="text-primary hover:bg-primary/10"
                >
                  View All
                </Button>
              </div>

              <div className="space-y-3">
                {recentJobs.map((job) => {
                  const StatusIcon = getStatusIcon(job.status);
                  return (
                    <button
                      key={job.id}
                      onClick={() => navigate('/employer/applications')}
                      className="w-full card-enhanced p-4 ios-list-item text-left group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <span>{job.salary}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                            <span>•</span>
                            <span>{job.postedDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(job.status)}>
                            <StatusIcon size={12} className="mr-1" />
                            {job.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex gap-4 text-sm text-muted-foreground">
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
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigate('/employer/applications')}
                  className="card-enhanced p-4 ios-list-item group"
                >
                  <Users size={24} className="text-primary mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium text-foreground">View Applications</span>
                </button>
                <button 
                  onClick={() => navigate('/employer/chat')}
                  className="card-enhanced p-4 ios-list-item group"
                >
                  <MessageCircle size={24} className="text-accent mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm font-medium text-foreground">Messages</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <EmployerBottomNav />
      </div>
    </MobileLayout>
  );
};

export default Dashboard;
