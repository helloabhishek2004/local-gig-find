
import React, { useState } from 'react';
import { Edit3, MapPin, Phone, Mail, Star, Settings, ChevronRight, ArrowLeft } from 'lucide-react';
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
        {/* Header - Consistent with other pages */}
        <div className="flex-shrink-0 px-4 pt-6 pb-4 bg-background/95 backdrop-blur-sm border-b border-border/20 safe-area-top">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={onEditProfile}
              className="hover:bg-accent/20 transition-colors duration-200 rounded-xl h-10 w-10"
            >
              <Edit3 size={20} className="text-muted-foreground" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Manage your profile and track applications</p>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-6 pb-28 overflow-y-auto">
          <div className="max-w-sm mx-auto space-y-6">
            {/* Profile Card */}
            <div className="card-enhanced p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200">
                  {profile.photo ? (
                    <img src={profile.photo} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-2">{profile.name}</h2>
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    <Star size={16} fill="currentColor" />
                    <span className="font-medium">{profile.rating}</span>
                    <span className="text-muted-foreground text-sm">({profile.jobsCompleted} jobs)</span>
                  </div>
                  <span className="inline-block bg-success/10 text-success text-xs px-3 py-1.5 rounded-full font-medium">
                    {profile.availability}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Phone size={18} className="text-primary" />
                  <span className="text-base">{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail size={18} className="text-primary" />
                  <span className="text-base">{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={18} className="text-primary" />
                  <span className="text-base">{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Profile Completeness */}
            <ProfileCompletenessIndicator completionData={completionData} />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="card-enhanced p-4 text-center hover:shadow-md hover:scale-105 transition-all duration-200"
                >
                  <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="card-enhanced p-6">
              <h3 className="font-semibold text-foreground mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Resume Upload */}
            <ResumeUpload onResumeChange={handleResumeChange} currentResume={resume ? 'uploaded' : null} />

            {/* Application Tracker */}
            <ApplicationTracker applications={applications} />

            {/* Menu Items */}
            {menuItems.length > 0 && (
              <div className="card-enhanced overflow-hidden">
                {menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-5 hover:bg-accent/5 transition-colors duration-200 border-b border-border/50 last:border-b-0 active:scale-[0.98] transition-transform"
                  >
                    <div className="flex items-center gap-4">
                      <item.icon size={20} className="text-muted-foreground" />
                      <span className="font-medium text-foreground text-base">{item.label}</span>
                    </div>
                    <ChevronRight size={20} className="text-muted-foreground" />
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
