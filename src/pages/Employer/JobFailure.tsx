
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployerJobFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative">
      <div className="gradient-bg-employer" />
      <div className="bg-white/90 backdrop-blur-lg border border-border/20 rounded-2xl shadow-2xl px-8 py-12 flex flex-col items-center gap-6 animate-fade-slide-up">
        <div className="bg-destructive/20 rounded-full w-24 h-24 flex items-center justify-center animate-bounce">
          <X size={54} className="text-destructive" />
        </div>
        <h1 className="text-3xl font-bold text-destructive animate-fade-in">Oops! Failed to Post Job</h1>
        <p className="text-muted-foreground text-center">
          Something went wrong. Please check your details and try again, or contact support if the issue persists.
        </p>
        <Button 
          className="mt-4 w-full btn-accent"
          onClick={() => navigate('/employer/post-job')}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default EmployerJobFailure;
