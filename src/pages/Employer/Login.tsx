
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, ArrowLeft } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';

const EmployerLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    console.log('Employer login attempt:', formData);
    navigate('/employer/dashboard');
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full p-ios-lg">
        {/* Header */}
        <div className="flex items-center mb-ios-xl">
          <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors p-ios-sm -ml-ios-sm">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-ios-headline ml-ios-sm">Business Sign In</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-ios-xl">
          <div className="text-center space-y-ios-sm">
            <h1 className="text-ios-title1 font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground text-ios-body">Sign in to manage your job posts</p>
          </div>

          <div className="space-y-ios-lg">
            <div className="space-y-ios-md">
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
                <Label htmlFor="password" className="text-ios-subhead font-medium">Password</Label>
                <div className="relative mt-ios-xs">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
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
            </div>

            <Button 
              onClick={handleLogin}
              className="w-full h-12 text-ios-body btn-accent ios-button"
              disabled={!formData.email || !formData.password}
            >
              Sign In
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-ios-footnote">
                <span className="px-ios-sm bg-background text-muted-foreground">or</span>
              </div>
            </div>

            <Button 
              variant="outline"
              className="w-full h-12 text-ios-body ios-button"
              onClick={handleLogin}
            >
              Continue with Google
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground text-ios-footnote">
            Don't have a business account?{' '}
            <Link to="/employer/register" className="text-primary font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default EmployerLogin;
