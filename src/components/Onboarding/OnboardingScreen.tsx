
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, MapPin, Clock, Users } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const screens = [
    {
      icon: <MapPin className="w-16 h-16 text-primary" />,
      title: "Find Local Jobs",
      subtitle: "Discover temporary and part-time opportunities in Varkala and nearby areas",
      description: "Connect with local businesses looking for help"
    },
    {
      icon: <Clock className="w-16 h-16 text-primary" />,
      title: "Quick & Easy",
      subtitle: "Apply for jobs in seconds and get quick responses from employers",
      description: "No lengthy application processes"
    },
    {
      icon: <Users className="w-16 h-16 text-primary" />,
      title: "Direct Contact",
      subtitle: "Chat directly with business owners and get hired faster",
      description: "Build relationships with local employers"
    }
  ];

  const handleNext = () => {
    if (currentStep < screens.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const screen = screens[currentStep];

  return (
    <MobileLayout>
      <div className="flex flex-col h-full p-6">
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8">
          <div className="mb-8">
            {screen.icon}
          </div>
          
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-foreground">
              {screen.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {screen.subtitle}
            </p>
            <p className="text-sm text-muted-foreground">
              {screen.description}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center space-x-2 mb-6">
            {screens.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>

          <Button 
            onClick={handleNext}
            className="w-full h-12 text-lg btn-accent"
          >
            {currentStep === screens.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>

          {currentStep > 0 && (
            <Button
              variant="ghost"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="w-full text-muted-foreground"
            >
              Back
            </Button>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default OnboardingScreen;
