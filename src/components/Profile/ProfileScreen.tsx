
import React, { useState } from 'react';
import { Edit3, MapPin, Phone, Mail, Star, Settings, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/Layout/MobileLayout';

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
    photo: null
  });

  const stats = [
    { label: 'Jobs Applied', value: '24', color: 'text-blue-600' },
    { label: 'Jobs Completed', value: profile.jobsCompleted.toString(), color: 'text-green-600' },
    { label: 'Rating', value: profile.rating.toString(), color: 'text-amber-600' },
  ];

  const menuItems = [
    { id: 'edit', label: 'Edit Profile', icon: Edit3, action: onEditProfile },
    { id: 'settings', label: 'Settings', icon: Settings, action: onSettings },
  ];

  return (
    <MobileLayout>
      <div className="p-4 pb-24 animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Profile</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={onEditProfile}
            className="hover:bg-accent transition-colors duration-200"
          >
            <Edit3 size={20} />
          </Button>
        </div>

        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border mb-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center gap-4 mb-4">
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
              <h2 className="text-xl font-semibold text-foreground">{profile.name}</h2>
              <div className="flex items-center gap-1 text-amber-600 mb-1">
                <Star size={16} fill="currentColor" />
                <span className="font-medium">{profile.rating}</span>
                <span className="text-muted-foreground text-sm">({profile.jobsCompleted} jobs)</span>
              </div>
              <span className="inline-block bg-success/10 text-success text-xs px-3 py-1 rounded-full font-medium">
                {profile.availability}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Phone size={16} />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Mail size={16} />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <MapPin size={16} />
              <span>{profile.location}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-card rounded-xl p-4 text-center shadow-sm border hover:shadow-md hover:scale-105 transition-all duration-200"
            >
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border mb-6">
          <h3 className="font-semibold text-foreground mb-3">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary/10 text-primary px-3 py-1 rounded-lg text-sm font-medium hover:bg-primary/20 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card rounded-2xl shadow-sm border overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.id}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-colors duration-200 border-b border-border last:border-b-0 active:scale-98"
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className="text-muted-foreground" />
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default ProfileScreen;
