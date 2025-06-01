
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';
import OTPVerification from './OTPVerification';

interface RegisterScreenProps {
  onRegister: () => void;
  onBack: () => void;
}

const RegisterScreen = ({ onRegister, onBack }: RegisterScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAccount = () => {
    // Simulate sending OTP
    console.log('Sending OTP to:', formData.phone);
    setShowOTP(true);
  };

  const handleOTPVerified = () => {
    console.log('OTP verified, account created');
    onRegister();
  };

  const handleBackFromOTP = () => {
    setShowOTP(false);
  };

  if (showOTP) {
    return (
      <OTPVerification 
        phoneNumber={formData.phone}
        onVerified={handleOTPVerified}
        onBack={handleBackFromOTP}
      />
    );
  }

  return (
    <MobileLayout>
      <div className="flex flex-col h-full safe-area-top">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-border/50">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold ml-2">Create Account</h1>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="max-w-sm mx-auto space-y-8">
            {/* Title Section */}
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-bold text-foreground">Join LocalJobs</h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                Start your job search journey in your local area
              </p>
            </div>

            {/* Form */}
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="h-12 text-base border-2 focus:border-primary transition-colors"
                />
                <p className="text-xs text-muted-foreground">We'll send an OTP to verify your number</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="h-12 text-base pr-12 border-2 focus:border-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Create Account Button */}
            <Button 
              onClick={handleCreateAccount}
              className="w-full h-14 text-lg font-semibold btn-accent rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              Create Account
            </Button>

            {/* Terms */}
            <p className="text-xs text-muted-foreground text-center leading-relaxed px-4">
              By creating an account, you agree to our{' '}
              <span className="text-primary font-medium">Terms of Service</span> and{' '}
              <span className="text-primary font-medium">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default RegisterScreen;
