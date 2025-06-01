
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Camera, MapPin, Briefcase } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';

interface EditProfileScreenProps {
  onSave: () => void;
  onBack: () => void;
}

const EditProfileScreen = ({ onSave, onBack }: EditProfileScreenProps) => {
  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@gmail.com',
    location: 'Varkala, Kerala',
    bio: 'Experienced in delivery, sales, and customer service. Available for immediate work.',
    skills: ['Delivery', 'Sales', 'Helper', 'Waiter'],
    availability: 'Available Now',
    photo: null
  });

  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = () => {
    console.log('Saving profile:', profile);
    onSave();
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full safe-area-top">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <div className="flex items-center">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold ml-2">Edit Profile</h1>
          </div>
          <Button 
            onClick={handleSave}
            className="btn-accent px-6 h-9 text-sm font-semibold rounded-lg"
          >
            Save
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-6 overflow-y-auto pb-6">
          <div className="max-w-sm mx-auto space-y-8">
            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  {profile.photo ? (
                    <img src={profile.photo} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
                  <Camera size={16} className="text-accent-foreground" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">Tap to change photo</p>
            </div>

            {/* Basic Info */}
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                  <MapPin size={16} />
                  Location
                </Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">About Me</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell employers about your experience and what makes you a great candidate..."
                  className="min-h-[100px] text-base border-2 focus:border-primary transition-colors resize-none"
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <Label className="text-sm font-medium flex items-center gap-2">
                <Briefcase size={16} />
                Skills & Expertise
              </Label>
              
              {/* Current Skills */}
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 group hover:bg-primary/20 transition-colors"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="text-primary/60 hover:text-primary transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Add New Skill */}
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-1 h-10 text-sm border-2 focus:border-primary transition-colors"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button
                  onClick={addSkill}
                  variant="outline"
                  className="h-10 px-4 text-sm border-2 hover:border-primary transition-colors"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label htmlFor="availability" className="text-sm font-medium">Availability Status</Label>
              <select
                id="availability"
                value={profile.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                className="w-full h-12 px-3 text-base border-2 border-input rounded-md bg-background focus:border-primary transition-colors"
              >
                <option value="Available Now">Available Now</option>
                <option value="Available This Week">Available This Week</option>
                <option value="Available Next Week">Available Next Week</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default EditProfileScreen;
