
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployerJobSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="gradient-bg-employer" />
      <div className="bg-white/90 backdrop-blur-lg border border-border/20 rounded-2xl shadow-2xl px-8 py-12 flex flex-col items-center gap-6 animate-fade-slide-up">
        <div className="bg-success/20 rounded-full w-24 h-24 flex items-center justify-center animate-bounce">
          <Check size={54} className="text-success" />
        </div>
        <h1 className="text-3xl font-bold text-success animate-fade-in">Job Posted Successfully!</h1>
        <p className="text-muted-foreground text-center">
          Your job listing is now live and visible to job seekers. Good luck finding the talent you need!
        </p>
        <Button 
          className="mt-4 w-full btn-accent"
          onClick={() => navigate('/employer/dashboard')}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default EmployerJobSuccess;
