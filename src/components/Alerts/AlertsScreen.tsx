
import React, { useState } from 'react';
import { Bell, BellRing, Clock, MapPin, Star, TrendingUp, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/Layout/MobileLayout';

const AlertsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filterOptions = [
    { id: 'all', label: 'All', icon: Bell },
    { id: 'alerts', label: 'Alerts', icon: BellRing },
    { id: 'notifications', label: 'Updates', icon: Clock },
    { id: 'promotions', label: 'Promos', icon: Star },
    { id: 'tips', label: 'Tips', icon: TrendingUp },
    { id: 'payment', label: 'Payment', iconEmoji: '💰' },
  ];

  const notifications = [
    {
      id: '1',
      type: 'job_match',
      category: 'alerts',
      title: 'New Job Match!',
      message: 'Restaurant Server position at Ocean View Cafe matches your preferences',
      time: '5 min ago',
      isRead: false,
      icon: '🎯',
      action: 'View Job'
    },
    {
      id: '2',
      type: 'application_update',
      category: 'notifications',
      title: 'Application Update',
      message: 'Your application for Delivery Boy at QuickMart has been viewed',
      time: '1 hour ago',
      isRead: false,
      icon: '📄',
      action: 'View Status'
    },
    {
      id: '3',
      type: 'urgent_job',
      category: 'alerts',
      title: 'Urgent Hiring',
      message: 'Event Helper needed immediately for tomorrow\'s wedding in Varkala',
      time: '2 hours ago',
      isRead: true,
      icon: '🔥',
      action: 'Apply Now',
      isUrgent: true
    },
    {
      id: '4',
      type: 'payment',
      category: 'payment',
      title: 'Payment Received',
      message: 'You received ₹300 for your work at Beach Cafe Varkala',
      time: '1 day ago',
      isRead: true,
      icon: '💰',
      action: 'View Details'
    },
    {
      id: '5',
      type: 'tip',
      category: 'tips',
      title: 'Job Search Tip',
      message: 'Complete your profile to get 3x more job matches',
      time: '2 days ago',
      isRead: true,
      icon: '💡',
      action: 'Complete Profile'
    },
    {
      id: '6',
      type: 'weekly_summary',
      category: 'notifications',
      title: 'Weekly Summary',
      message: 'You applied to 5 jobs this week and earned ₹1,200',
      time: '3 days ago',
      isRead: true,
      icon: '📊',
      action: 'View Report'
    }
  ];

  const filteredNotifications = selectedFilter === 'all' 
    ? notifications 
    : notifications.filter(n => n.category === selectedFilter);

  const unreadCount = filteredNotifications.filter(n => !n.isRead).length;

  return (
    <MobileLayout>
      <div className="flex flex-col h-screen">
        {/* Fixed Header */}
        <div className="flex-shrink-0 bg-background/95 backdrop-blur-md border-b border-border/50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
                <p className="text-muted-foreground mt-1">
                  {unreadCount > 0 ? `${unreadCount} new notifications` : 'All caught up!'}
                </p>
              </div>
              <div className="relative">
                <Bell size={24} className="text-muted-foreground" />
                {unreadCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {unreadCount}
                  </div>
                )}
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex space-x-2 overflow-x-scroll pb-2">
              {filterOptions.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                      selectedFilter === filter.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {filter.iconEmoji ? (
                      <span className="text-sm">{filter.iconEmoji}</span>
                    ) : (
                      <IconComponent size={16} />
                    )}
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Scrollable Notifications List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔔</div>
                <h3 className="text-lg font-medium text-foreground mb-2">No notifications</h3>
                <p className="text-muted-foreground px-4">No notifications in this category yet</p>
              </div>
            ) : (
              <div className="space-y-3 pb-24">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      !notification.isRead 
                        ? 'bg-primary/5 border-primary/20' 
                        : 'bg-card border-border/50 hover:bg-muted/30'
                    } ${notification.isUrgent ? 'ring-2 ring-accent/50' : ''}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl flex-shrink-0 mt-1">
                        {notification.icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`font-medium text-sm ${
                            !notification.isRead ? 'text-foreground' : 'text-muted-foreground'
                          }`}>
                            {notification.title}
                            {notification.isUrgent && (
                              <span className="ml-2 text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                                Urgent
                              </span>
                            )}
                          </h3>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock size={12} className="mr-1" />
                            {notification.time}
                          </div>
                          
                          <Button 
                            size="sm" 
                            variant={notification.isUrgent ? "default" : "ghost"}
                            className="text-xs h-8"
                          >
                            {notification.action}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default AlertsScreen;
