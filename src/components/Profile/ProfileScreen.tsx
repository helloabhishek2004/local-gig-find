
import React, { useState } from 'react';
import { Edit3, MapPin, Phone, Mail, Star, Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/Layout/MobileLayout';
import ProfileCompletenessIndicator from './ProfileCompletenessIndicator';
import ApplicationTracker from './ApplicationTracker';
import ResumeUpload from './ResumeUpload';

interface ProfileScreenProps {
  onEditProfile: () => void;
  onSettings: () => void;
}

const ProfileScreen = ({ onEditProfile, onSettings }: ProfileScreenProps) => {
  const [profile] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@gmail.com',
    location: 'Varkala, Kerala',
    rating: 4.8,
    jobsCompleted: 12,
    skills: ['Delivery', 'Sales', 'Helper', 'Waiter'],
    availability: 'Available Now',
    photo: null,
    bio: 'Experienced in delivery, sales, and customer service. Available for immediate work.',
    resume: null
  });

  const [resume, setResume] = useState<File | null>(null);

  // Mock completion data
  const completionData = {
    profilePhoto: !!profile.photo,
    basicInfo: !!(profile.name && profile.phone && profile.email && profile.location),
    skills: profile.skills.length > 0,
    resume: !!resume,
    bio: !!profile.bio
  };

  // Mock applications data
  const applications = [
    {
      id: '1',
      jobTitle: 'Restaurant Server',
      company: 'Beach Cafe Varkala',
      appliedDate: '2 days ago',
      status: 'viewed' as const,
      lastUpdate: '1 day ago'
    },
    {
      id: '2',
      jobTitle: 'Delivery Boy',
      company: 'Local Grocery Store',
      appliedDate: '5 days ago',
      status: 'pending' as const,
      lastUpdate: '5 days ago'
    },
    {
      id: '3',
      jobTitle: 'Event Helper',
      company: 'Varkala Events',
      appliedDate: '1 week ago',
      status: 'interview' as const,
      lastUpdate: '2 days ago'
    }
  ];

  const stats = [
    { label: 'Jobs Applied', value: '24', color: 'text-info' },
    { label: 'Jobs Completed', value: profile.jobsCompleted.toString(), color: 'text-success' },
    { label: 'Rating', value: profile.rating.toString(), color: 'text-amber-600' },
  ];

  const menuItems = [
    { id: 'settings', label: 'Settings', icon: Settings, action: onSettings },
  ];

  const handleResumeChange = (file: File | null) => {
    setResume(file);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background">
        {/* iOS-style Header */}
        <div className="flex-shrink-0 px-ios-md pt-ios-lg pb-ios-sm ios-navbar safe-area-top">
          <div className="flex items-center justify-between mb-ios-xs">
            <h1 className="text-ios-title1 font-bold text-foreground">Profile</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={onEditProfile}
              className="hover:bg-accent/10 transition-all duration-200 rounded-ios h-11 w-11 ios-button"
            >
              <Edit3 size={20} className="text-primary" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-ios-md py-ios-sm pb-32 overflow-y-auto">
          <div className="max-w-sm mx-auto space-y-ios-lg">
            {/* Profile Card */}
            <div className="card-enhanced p-ios-xl animate-fade-in">
              <div className="flex items-center gap-ios-md mb-ios-xl">
                <div className="w-20 h-20 bg-primary/10 rounded-ios-xl flex items-center justify-center shadow-ios transition-transform duration-200 hover:scale-105">
                  {profile.photo ? (
                    <img src={profile.photo} alt="Profile" className="w-full h-full rounded-ios-xl object-cover" />
                  ) : (
                    <span className="text-ios-title2 font-bold text-primary">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-ios-title2 font-bold text-foreground mb-ios-xs">{profile.name}</h2>
                  <div className="flex items-center gap-1 text-amber-500 mb-ios-xs">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold text-ios-footnote">{profile.rating}</span>
                    <span className="text-muted-foreground text-ios-caption">({profile.jobsCompleted} jobs)</span>
                  </div>
                  <span className="inline-block bg-success/10 text-success text-ios-caption px-ios-sm py-1.5 rounded-ios font-medium">
                    {profile.availability}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-ios-sm">
                <div className="flex items-center gap-ios-sm text-muted-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-ios flex items-center justify-center">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <span className="text-ios-callout">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-ios-sm text-muted-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-ios flex items-center justify-center">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <span className="text-ios-callout">{profile.email}</span>
                </div>
                <div className="flex items-center gap-ios-sm text-muted-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-ios flex items-center justify-center">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <span className="text-ios-callout">{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Profile Completeness */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <ProfileCompletenessIndicator completionData={completionData} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-ios-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="card-enhanced p-ios-md text-center ios-list-item"
                >
                  <div className={`text-ios-title2 font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-ios-caption text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="card-enhanced p-ios-xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-semibold text-foreground mb-ios-md text-ios-headline">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-ios-xs">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-ios-sm py-ios-xs rounded-ios text-ios-footnote font-medium hover:bg-primary/20 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume Upload */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <ResumeUpload onResumeChange={handleResumeChange} currentResume={resume ? 'uploaded' : null} />
            </div>

            {/* Application Tracker */}
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <ApplicationTracker applications={applications} />
            </div>

            {/* Menu Items */}
            {menuItems.length > 0 && (
              <div className="card-enhanced overflow-hidden animate-fade-in" style={{ animationDelay: '0.6s' }}>
                {menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-ios-lg hover:bg-accent/5 transition-colors duration-200 border-b border-border/30 last:border-b-0 ios-list-item active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-ios-md">
                      <div className="w-8 h-8 bg-muted/50 rounded-ios flex items-center justify-center">
                        <item.icon size={18} className="text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground text-ios-callout">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default ProfileScreen;
