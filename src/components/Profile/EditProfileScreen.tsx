
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Camera, MapPin, Briefcase, Image, Upload } from 'lucide-react';
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
    photo: null as string | null
  });

  const [newSkill, setNewSkill] = useState('');
  const [showImageOptions, setShowImageOptions] = useState(false);

  const locationOptions = [
    'Varkala, Kerala',
    'Thiruvananthapuram, Kerala',
    'Kollam, Kerala',
    'Alappuzha, Kerala',
    'Kottayam, Kerala',
    'Ernakulam, Kerala',
    'Thrissur, Kerala',
    'Palakkad, Kerala',
    'Malappuram, Kerala',
    'Kozhikode, Kerala',
    'Wayanad, Kerala',
    'Kannur, Kerala',
    'Kasaragod, Kerala'
  ];

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

  const handleImageUpload = (source: 'camera' | 'gallery') => {
    // In a real app, this would handle camera/gallery access
    if (source === 'camera') {
      // Trigger camera
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setProfile(prev => ({ ...prev, photo: e.target?.result as string }));
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      // Trigger gallery
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setProfile(prev => ({ ...prev, photo: e.target?.result as string }));
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    }
    setShowImageOptions(false);
  };

  const handleSave = () => {
    console.log('Saving profile:', profile);
    onSave();
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full safe-area-top">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold ml-2">Edit Profile</h1>
          </div>
          <Button 
            onClick={handleSave}
            className="btn-accent px-6 h-9 text-sm font-semibold"
          >
            Save
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-6 overflow-y-auto pb-6">
          <div className="max-w-sm mx-auto space-y-8">
            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-4 animate-fade-in">
              <div className="relative">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                  {profile.photo ? (
                    <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => setShowImageOptions(true)}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                >
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
                  className="h-12 text-base border-2 focus:border-primary transition-colors rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="h-12 text-base border-2 focus:border-primary transition-colors rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12 text-base border-2 focus:border-primary transition-colors rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                  <MapPin size={16} />
                  Location
                </Label>
                <select
                  id="location"
                  value={profile.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full h-12 px-3 text-base border-2 border-input rounded-xl bg-background focus:border-primary transition-colors"
                >
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">About Me</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell employers about your experience and what makes you a great candidate..."
                  className="min-h-[100px] text-base border-2 focus:border-primary transition-colors resize-none rounded-xl"
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
                    className="bg-primary/10 text-primary px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 group hover:bg-primary/20 transition-colors animate-scale-in"
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
                  className="flex-1 h-10 text-sm border-2 focus:border-primary transition-colors rounded-lg"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button
                  onClick={addSkill}
                  variant="outline"
                  className="h-10 px-4 text-sm border-2 hover:border-primary transition-colors rounded-lg"
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
                className="w-full h-12 px-3 text-base border-2 border-input rounded-xl bg-background focus:border-primary transition-colors"
              >
                <option value="Available Now">Available Now</option>
                <option value="Available This Week">Available This Week</option>
                <option value="Available Next Week">Available Next Week</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fixed Modal for Image Upload Options */}
        {showImageOptions && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3 className="text-lg font-semibold mb-4 text-center">Choose Photo</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => handleImageUpload('camera')}
                  className="w-full flex items-center gap-3 h-12 justify-start rounded-xl"
                  variant="outline"
                >
                  <Camera size={20} />
                  Take Photo
                </Button>
                <Button
                  onClick={() => handleImageUpload('gallery')}
                  className="w-full flex items-center gap-3 h-12 justify-start rounded-xl"
                  variant="outline"
                >
                  <Image size={20} />
                  Choose from Gallery
                </Button>
                <Button
                  onClick={() => setShowImageOptions(false)}
                  className="w-full h-12 rounded-xl"
                  variant="ghost"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default EditProfileScreen;
