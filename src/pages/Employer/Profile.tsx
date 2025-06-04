
import React, { useState } from 'react';
import { Edit3, MapPin, Phone, Mail, Star, Settings, ChevronRight, Building2, Users, Calendar } from 'lucide-react';
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
    { id: 'edit', label: 'Edit Profile', icon: Edit3, action: () => navigate('/employer/edit-profile') },
    { id: 'settings', label: 'Settings', icon: Settings, action: () => navigate('/employer/settings') },
  ];

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background">
        {/* Header */}
        <div className="flex-shrink-0 px-ios-md pt-ios-lg pb-ios-sm ios-navbar safe-area-top">
          <div className="flex items-center justify-between mb-ios-xs">
            <h1 className="text-ios-title1 font-bold text-foreground">Business Profile</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/employer/edit-profile')}
              className="hover:bg-accent/10 transition-all duration-200 rounded-ios h-11 w-11 ios-button"
            >
              <Edit3 size={20} className="text-primary" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-ios-md py-ios-sm pb-24 overflow-y-auto">
          <div className="max-w-sm mx-auto space-y-ios-lg">
            {/* Business Profile Card */}
            <div className="card-enhanced p-ios-xl animate-fade-in">
              <div className="flex items-center gap-ios-md mb-ios-xl">
                <div className="w-20 h-20 bg-primary/10 rounded-ios-xl flex items-center justify-center shadow-ios transition-transform duration-200 hover:scale-105">
                  {profile.logo ? (
                    <img src={profile.logo} alt="Business Logo" className="w-full h-full rounded-ios-xl object-cover" />
                  ) : (
                    <span className="text-ios-title2 font-bold text-primary">
                      {profile.businessName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-ios-xs">
                    <h2 className="text-ios-title2 font-bold text-foreground">{profile.businessName}</h2>
                    {profile.verified && (
                      <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <p className="text-muted-foreground text-ios-callout mb-ios-xs">{profile.ownerName}</p>
                  <div className="flex items-center gap-1 text-amber-500 mb-ios-xs">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold text-ios-footnote">{profile.rating}</span>
                    <span className="text-muted-foreground text-ios-caption">({profile.totalHires} hires)</span>
                  </div>
                  <span className="inline-block bg-primary/10 text-primary text-ios-caption px-ios-sm py-1.5 rounded-ios font-medium">
                    {profile.category}
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

              {/* Description */}
              {profile.description && (
                <div className="mt-ios-lg pt-ios-lg border-t border-border/30">
                  <h3 className="font-semibold text-foreground mb-ios-sm text-ios-headline">About</h3>
                  <p className="text-muted-foreground text-ios-callout leading-relaxed">{profile.description}</p>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-ios-sm animate-fade-in" style={{ animationDelay: '0.1s' }}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="card-enhanced p-ios-lg flex items-center gap-ios-md ios-list-item"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-ios-lg flex items-center justify-center">
                    <stat.icon size={20} className={stat.color} />
                  </div>
                  <div className="flex-1">
                    <div className="text-ios-callout text-muted-foreground">{stat.label}</div>
                    <div className={`text-ios-headline font-bold ${stat.color}`}>{stat.value}</div>
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

        <EmployerBottomNav />
      </div>
    </MobileLayout>
  );
};

export default Profile;
