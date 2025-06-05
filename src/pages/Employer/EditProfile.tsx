
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, MapPin, Building2, Image, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import MobileLayout from '@/components/Layout/MobileLayout';

const EditProfile = () => {
  const navigate = useNavigate();
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [profile, setProfile] = useState({
    businessName: 'Beach Cafe Varkala',
    ownerName: 'Suresh Nair',
    phone: '+91 98765 43210',
    email: 'beachcafe@gmail.com',
    location: 'Varkala Beach, Kerala',
    category: 'Restaurant & Hospitality',
    description: 'Traditional Kerala restaurant serving authentic local cuisine with beautiful beach views.',
    logo: null as string | null
  });

  const categories = [
    'Restaurant & Hospitality',
    'Retail & Shopping',
    'Delivery & Logistics',
    'Healthcare',
    'Education',
    'Construction',
    'Manufacturing',
    'Services',
    'Technology',
    'Other'
  ];

  const locationOptions = [
    'Varkala Beach, Kerala',
    'Thiruvananthapuram, Kerala',
    'Kollam, Kerala',
    'Alappuzha, Kerala',
    'Kottayam, Kerala',
    'Ernakulam, Kerala',
    'Thrissur, Kerala',
    'Other'
  ];

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (source: 'camera' | 'gallery') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    if (source === 'camera') {
      input.capture = 'environment';
    }
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfile(prev => ({ ...prev, logo: e.target?.result as string }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
    setShowImageOptions(false);
  };

  const handleSave = () => {
    console.log('Saving profile:', profile);
    navigate('/employer/profile');
  };

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background animate-fade-in">
        {/* Header */}
        <div className="flex-shrink-0 px-4 pt-12 pb-4 ios-navbar safe-area-top">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/employer/profile')} 
                className="text-primary hover:text-primary/80 transition-colors p-2 -ml-2 ios-button rounded-full"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold ml-2">Edit Profile</h1>
            </div>
            <Button 
              onClick={handleSave}
              className="btn-accent px-6 h-10 text-sm font-semibold ios-button"
            >
              <Save size={16} className="mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-24">
          <div className="max-w-sm mx-auto space-y-8">
            {/* Business Logo */}
            <div className="flex flex-col items-center space-y-4 animate-fade-in">
              <div className="relative">
                <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg">
                  {profile.logo ? (
                    <img src={profile.logo} alt="Business Logo" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {profile.businessName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  )}
                </div>
                <button 
                  onClick={() => setShowImageOptions(true)}
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ios-button"
                >
                  <Camera size={16} className="text-accent-foreground" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground">Tap to change business logo</p>
            </div>

            {/* Business Info */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-sm font-medium flex items-center gap-2">
                  <Building2 size={16} />
                  Business Name
                </Label>
                <Input
                  id="businessName"
                  value={profile.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  className="ios-input h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerName" className="text-sm font-medium">
                  Owner Name
                </Label>
                <Input
                  id="ownerName"
                  value={profile.ownerName}
                  onChange={(e) => handleInputChange('ownerName', e.target.value)}
                  className="ios-input h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="ios-input h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="ios-input h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">
                  Business Category
                </Label>
                <select
                  id="category"
                  value={profile.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full h-12 px-3 ios-input"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
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
                  className="w-full h-12 px-3 ios-input"
                >
                  {locationOptions.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Business Description
                </Label>
                <Textarea
                  id="description"
                  value={profile.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your business and what makes it special..."
                  className="min-h-[100px] ios-input resize-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload Modal */}
        {showImageOptions && (
          <div className="modal-backdrop animate-fade-in">
            <div className="modal-content animate-scale-in">
              <h3 className="text-lg font-semibold mb-6 text-center">Choose Logo</h3>
              <div className="space-y-3">
                <Button
                  onClick={() => handleImageUpload('camera')}
                  className="w-full flex items-center gap-3 h-12 justify-start rounded-xl ios-button"
                  variant="outline"
                >
                  <Camera size={20} />
                  <span>Take Photo</span>
                </Button>
                <Button
                  onClick={() => handleImageUpload('gallery')}
                  className="w-full flex items-center gap-3 h-12 justify-start rounded-xl ios-button"
                  variant="outline"
                >
                  <Image size={20} />
                  <span>Choose from Gallery</span>
                </Button>
                <Button
                  onClick={() => setShowImageOptions(false)}
                  className="w-full h-12 rounded-xl ios-button"
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

export default EditProfile;
