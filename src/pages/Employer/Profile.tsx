
import React, { useState } from 'react';
import { Edit3, MapPin, Phone, Mail, Star, ChevronRight, Building2, Users, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MobileLayout from '@/components/Layout/MobileLayout';
import EmployerBottomNav from '@/components/Navigation/EmployerBottomNav';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profile] = useState({
    businessName: 'Beach Cafe Varkala',
    ownerName: 'Suresh Nair',
    phone: '+91 98765 43210',
    email: 'beachcafe@gmail.com',
    location: 'Varkala Beach, Kerala',
    category: 'Restaurant & Hospitality',
    rating: 4.6,
    totalJobs: 8,
    activeJobs: 3,
    totalHires: 25,
    memberSince: 'March 2024',
    logo: null,
    description: 'Traditional Kerala restaurant serving authentic local cuisine with beautiful beach views.',
    verified: true
  });

  const stats = [
    { label: 'Active Jobs', value: profile.activeJobs.toString(), color: 'text-primary', icon: Building2 },
    { label: 'Total Hires', value: profile.totalHires.toString(), color: 'text-success', icon: Users },
    { label: 'Member Since', value: profile.memberSince, color: 'text-info', icon: Calendar },
  ];

  const menuItems = [
    { id: 'settings', label: 'Settings', icon: Settings, action: () => navigate('/employer/settings') },
  ];

  return (
    <MobileLayout>
      <div className="flex flex-col h-screen bg-background overflow-hidden">
        {/* Header */}
        <div className="flex-shrink-0 pt-safe px-4 py-6 bg-background/95 backdrop-blur-sm">
          <div className="max-w-sm mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold text-foreground">Profile</h1>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2"
              aria-label="Edit Profile"
              onClick={() => navigate('/employer/edit-profile')}
            >
              <Edit3 size={22} />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2 pb-24">
          <div className="max-w-sm mx-auto space-y-6">
            {/* Business Profile Card */}
            <div className="card-enhanced p-6 animate-fade-in">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-105">
                  {profile.logo ? (
                    <img src={profile.logo} alt="Business Logo" className="w-full h-full rounded-2xl object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {profile.businessName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-foreground">{profile.businessName}</h2>
                    {profile.verified && (
                      <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-1">{profile.ownerName}</p>
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold text-sm">{profile.rating}</span>
                    <span className="text-muted-foreground text-xs">({profile.totalHires} hires)</span>
                  </div>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                    {profile.category}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <span>{profile.location}</span>
                </div>
              </div>

              {/* Description */}
              {profile.description && (
                <div className="mt-6 pt-6 border-t border-border/30">
                  <h3 className="font-semibold text-foreground mb-2">About</h3>
                  <p className="text-muted-foreground leading-relaxed">{profile.description}</p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="card-enhanced p-4 flex items-center gap-4 ios-list-item hover:scale-105 transition-transform duration-200"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <stat.icon size={20} className={stat.color} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                    <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Menu Items */}
            {menuItems.length > 0 && (
              <div className="card-enhanced overflow-hidden animate-fade-in" style={{ animationDelay: '0.2s' }}>
                {menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="w-full flex items-center justify-between p-4 hover:bg-accent/5 transition-all duration-200 border-b border-border/30 last:border-b-0 ios-list-item group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center">
                        <item.icon size={18} className="text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </button>
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

export default Profile;
