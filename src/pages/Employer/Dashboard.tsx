
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Eye, MessageSquare, Users, TrendingUp } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';
import EmployerBottomNav from '@/components/Navigation/EmployerBottomNav';

const EmployerDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active Jobs', value: '3', icon: TrendingUp, color: 'text-primary' },
    { label: 'Total Views', value: '124', icon: Eye, color: 'text-accent' },
    { label: 'Applications', value: '18', icon: Users, color: 'text-success' },
    { label: 'Messages', value: '7', icon: MessageSquare, color: 'text-primary' },
  ];

  const recentJobs = [
    { title: 'Delivery Boy', status: 'Active', views: 45, applications: 8, postedDays: 2 },
    { title: 'Kitchen Helper', status: 'Active', views: 32, applications: 5, postedDays: 5 },
    { title: 'Cashier', status: 'Pending', views: 12, applications: 3, postedDays: 1 },
  ];

  return (
    <MobileLayout>
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="ios-navbar px-ios-lg py-ios-md border-b border-border/30">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-ios-title2 font-bold text-foreground">Dashboard</h1>
              <p className="text-ios-footnote text-muted-foreground">Manage your job posts</p>
            </div>
            <Button 
              onClick={() => navigate('/employer/post-job')}
              className="btn-accent ios-button"
              size="sm"
            >
              <Plus size={16} />
              Post Job
            </Button>
          </div>
        </div>

        <div className="p-ios-lg space-y-ios-lg">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-ios-sm">
            {stats.map((stat, index) => (
              <Card key={index} className="card-enhanced">
                <CardContent className="p-ios-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-ios-title1 font-bold text-foreground">{stat.value}</p>
                      <p className="text-ios-caption text-muted-foreground">{stat.label}</p>
                    </div>
                    <stat.icon size={24} className={stat.color} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="card-enhanced">
            <CardHeader className="pb-ios-sm">
              <CardTitle className="text-ios-headline">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-ios-sm">
              <Button 
                variant="ghost" 
                className="w-full justify-start h-12 ios-button"
                onClick={() => navigate('/employer/post-job')}
              >
                <Plus size={20} className="mr-ios-sm" />
                Post a New Job
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start h-12 ios-button"
                onClick={() => navigate('/employer/manage-jobs')}
              >
                <TrendingUp size={20} className="mr-ios-sm" />
                Manage Job Posts
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start h-12 ios-button"
                onClick={() => navigate('/employer/applications')}
              >
                <Users size={20} className="mr-ios-sm" />
                View Applications
              </Button>
            </CardContent>
          </Card>

          {/* Recent Job Posts */}
          <Card className="card-enhanced">
            <CardHeader className="pb-ios-sm">
              <CardTitle className="text-ios-headline">Recent Job Posts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-ios-sm">
              {recentJobs.map((job, index) => (
                <div key={index} className="ios-list-item">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-ios-subhead font-semibold text-foreground">{job.title}</h3>
                      <div className="flex items-center gap-ios-md mt-ios-xs">
                        <span className={`text-ios-caption px-ios-sm py-1 rounded-ios ${
                          job.status === 'Active' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'
                        }`}>
                          {job.status}
                        </span>
                        <span className="text-ios-caption text-muted-foreground">
                          {job.postedDays}d ago
                        </span>
                      </div>
                      <div className="flex items-center gap-ios-md mt-ios-xs">
                        <span className="text-ios-caption text-muted-foreground">
                          {job.views} views
                        </span>
                        <span className="text-ios-caption text-muted-foreground">
                          {job.applications} applications
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="ios-button">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <EmployerBottomNav activeTab="home" />
      </div>
    </MobileLayout>
  );
};

export default EmployerDashboard;
