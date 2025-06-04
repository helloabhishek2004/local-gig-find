
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Building, Phone, ArrowLeft } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';

const EmployerRegister = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = () => {
    console.log('Employer registration attempt:', formData);
    navigate('/employer/dashboard');
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full p-ios-lg">
        {/* Header */}
        <div className="flex items-center mb-ios-lg">
          <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors p-ios-sm -ml-ios-sm">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-ios-headline ml-ios-sm">Create Business Account</h1>
        </div>

        <div className="flex-1 space-y-ios-lg">
          <div className="text-center space-y-ios-sm">
            <h1 className="text-ios-title2 font-bold text-foreground">Start Hiring Today</h1>
            <p className="text-muted-foreground text-ios-body">Create your business account to post jobs</p>
          </div>

          <div className="space-y-ios-md">
            <div>
              <Label htmlFor="businessName" className="flex items-center gap-ios-sm text-ios-subhead font-medium">
                <Building size={16} />
                Business Name
              </Label>
              <Input
                id="businessName"
                placeholder="Your Business Name"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="h-12 text-ios-body ios-input mt-ios-xs"
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-ios-sm text-ios-subhead font-medium">
                <Mail size={16} />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="business@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="h-12 text-ios-body ios-input mt-ios-xs"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-ios-sm text-ios-subhead font-medium">
                <Phone size={16} />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="h-12 text-ios-body ios-input mt-ios-xs"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-ios-subhead font-medium">Password</Label>
              <div className="relative mt-ios-xs">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="h-12 text-ios-body pr-12 ios-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-ios-subhead font-medium">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="h-12 text-ios-body ios-input mt-ios-xs"
              />
            </div>
          </div>

          <Button 
            onClick={handleRegister}
            className="w-full h-12 text-ios-body btn-accent ios-button"
            disabled={!formData.businessName || !formData.email || !formData.password || formData.password !== formData.confirmPassword}
          >
            Create Account
          </Button>
        </div>

        <div className="text-center pb-ios-md">
          <p className="text-muted-foreground text-ios-footnote">
            Already have an account?{' '}
            <Link to="/employer/login" className="text-primary font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default EmployerRegister;
