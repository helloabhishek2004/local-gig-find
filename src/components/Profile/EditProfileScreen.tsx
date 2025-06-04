
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
        {/* iOS-style Header */}
        <div className="flex items-center justify-between px-ios-md py-ios-sm ios-navbar">
          <div className="flex items-center">
            <button onClick={onBack} className="text-primary hover:text-primary/80 transition-colors p-ios-xs -ml-2 ios-button rounded-ios">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-ios-headline font-semibold ml-ios-xs">Edit Profile</h1>
          </div>
          <Button 
            onClick={handleSave}
            className="btn-accent px-ios-lg h-10 text-ios-footnote font-semibold ios-button"
          >
            Save
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 px-ios-md py-ios-md overflow-y-auto pb-6">
          <div className="max-w-sm mx-auto space-y-ios-xl">
            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-ios-md animate-fade-in">
              <div className="relative">
                <div className="w-24 h-24 bg-primary/10 rounded-ios-xl flex items-center justify-center overflow-hidden shadow-ios">
                  {profile.photo ? (
                    <img src={profile.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-ios-title2 font-bold text-primary">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => setShowImageOptions(true)}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-ios-md hover:scale-110 transition-transform ios-button"
                >
                  <Camera size={16} className="text-accent-foreground" />
                </button>
              </div>
              <p className="text-ios-caption text-muted-foreground">Tap to change photo</p>
            </div>

            {/* Basic Info */}
            <div className="space-y-ios-lg">
              <div className="space-y-ios-xs">
                <Label htmlFor="name" className="text-ios-footnote font-medium ios-section-header">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="ios-input h-12 text-ios-callout"
                />
              </div>

              <div className="space-y-ios-xs">
                <Label htmlFor="phone" className="text-ios-footnote font-medium ios-section-header">Phone Number</Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="ios-input h-12 text-ios-callout"
                />
              </div>

              <div className="space-y-ios-xs">
                <Label htmlFor="email" className="text-ios-footnote font-medium ios-section-header">Email Address</Label>
                <Input
                  id="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="ios-input h-12 text-ios-callout"
                />
              </div>

              <div className="space-y-ios-xs">
                <Label htmlFor="location" className="text-ios-footnote font-medium flex items-center gap-2 ios-section-header">
                  <MapPin size={16} />
                  Location
                </Label>
                <select
                  id="location"
                  value={profile.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full h-12 px-ios-sm text-ios-callout ios-input"
                >
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-ios-xs">
                <Label htmlFor="bio" className="text-ios-footnote font-medium ios-section-header">About Me</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell employers about your experience and what makes you a great candidate..."
                  className="min-h-[100px] text-ios-callout ios-input resize-none"
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-ios-md">
              <Label className="text-ios-footnote font-medium flex items-center gap-2 ios-section-header">
                <Briefcase size={16} />
                Skills & Expertise
              </Label>
              
              {/* Current Skills */}
              <div className="flex flex-wrap gap-ios-xs">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-ios-sm py-ios-xs rounded-ios text-ios-footnote font-medium flex items-center gap-2 group hover:bg-primary/20 transition-colors animate-scale-in shadow-ios"
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
              <div className="flex gap-ios-xs">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  className="flex-1 h-10 text-ios-footnote ios-input"
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <Button
                  onClick={addSkill}
                  variant="outline"
                  className="h-10 px-ios-md text-ios-footnote ios-button"
                >
                  Add
                </Button>
              </div>
            </div>

            {/* Availability */}
            <div className="space-y-ios-xs">
              <Label htmlFor="availability" className="text-ios-footnote font-medium ios-section-header">Availability Status</Label>
              <select
                id="availability"
                value={profile.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                className="w-full h-12 px-ios-sm text-ios-callout ios-input"
              >
                <option value="Available Now">Available Now</option>
                <option value="Available This Week">Available This Week</option>
                <option value="Available Next Week">Available Next Week</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
          </div>
        </div>

        {/* iOS-style Modal for Image Upload Options */}
        {showImageOptions && (
          <div className="modal-backdrop">
            <div className="modal-content">
              <h3 className="text-ios-headline font-semibold mb-ios-lg text-center">Choose Photo</h3>
              <div className="space-y-ios-sm">
                <Button
                  onClick={() => handleImageUpload('camera')}
                  className="w-full flex items-center gap-ios-sm h-12 justify-start rounded-ios ios-button"
                  variant="outline"
                >
                  <Camera size={20} />
                  <span className="text-ios-callout">Take Photo</span>
                </Button>
                <Button
                  onClick={() => handleImageUpload('gallery')}
                  className="w-full flex items-center gap-ios-sm h-12 justify-start rounded-ios ios-button"
                  variant="outline"
                >
                  <Image size={20} />
                  <span className="text-ios-callout">Choose from Gallery</span>
                </Button>
                <Button
                  onClick={() => setShowImageOptions(false)}
                  className="w-full h-12 rounded-ios ios-button text-ios-callout"
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
