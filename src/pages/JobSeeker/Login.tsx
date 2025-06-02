
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Phone, ArrowLeft } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    console.log('Login attempt:', formData);
    navigate('/jobseeker/dashboard');
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold ml-2">Sign In</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in with your mobile number</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="phoneNumber" className="flex items-center gap-2">
                  <Phone size={16} />
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="h-12 text-base pr-12"
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
              className="w-full h-12 text-lg btn-accent"
              disabled={!formData.phoneNumber || !formData.password}
            >
              Sign In
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-background text-muted-foreground">or</span>
              </div>
            </div>

            <Button 
              variant="outline"
              className="w-full h-12 text-base"
              onClick={handleLogin}
            >
              Continue with Google
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/jobseeker/register" className="text-primary font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Login;
