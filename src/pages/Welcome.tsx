
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, ArrowRight } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <MobileLayout>
      <div className="flex flex-col h-screen bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="flex-1 flex flex-col justify-center px-6 py-8">
          {/* Logo/Brand Section */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Briefcase size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">LocalJobs</h1>
            <p className="text-muted-foreground text-lg">Find work opportunities in your area</p>
          </div>

          {/* Role Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-foreground mb-6">
              I'm looking for...
            </h2>
            
            <Button
              onClick={() => navigate('/jobseeker/login')}
              className="w-full h-16 bg-card hover:bg-card/80 text-foreground border-2 border-primary/20 hover:border-primary/40 rounded-2xl flex items-center justify-between px-6 transition-all duration-200 shadow-sm hover:shadow-md"
              variant="outline"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
                  <Users size={24} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-lg">Job Opportunities</p>
                  <p className="text-sm text-muted-foreground">Find work in your local area</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-muted-foreground" />
            </Button>

            <Button
              onClick={() => navigate('/employer/login')}
              className="w-full h-16 bg-card hover:bg-card/80 text-foreground border-2 border-accent/20 hover:border-accent/40 rounded-2xl flex items-center justify-between px-6 transition-all duration-200 shadow-sm hover:shadow-md"
              variant="outline"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mr-4">
                  <Briefcase size={24} className="text-accent" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-lg">Post Jobs</p>
                  <p className="text-sm text-muted-foreground">Hire local talent</p>
                </div>
              </div>
              <ArrowRight size={20} className="text-muted-foreground" />
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pb-8 px-6">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our{' '}
            <span className="text-primary font-medium">Terms of Service</span>
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Welcome;
