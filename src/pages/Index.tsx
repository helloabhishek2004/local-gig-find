
import React, { useState } from 'react';
import OnboardingScreen from '@/components/Onboarding/OnboardingScreen';
import LoginScreen from '@/components/Auth/LoginScreen';
import RegisterScreen from '@/components/Auth/RegisterScreen';
import HomeScreen from '@/components/Jobs/HomeScreen';
import JobDetailsScreen from '@/components/Jobs/JobDetailsScreen';
import BottomNav from '@/components/Navigation/BottomNav';

type Screen = 'onboarding' | 'login' | 'register' | 'home' | 'jobDetails' | 'saved' | 'chat' | 'notifications' | 'profile';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');

  const handleCompleteOnboarding = () => {
    setCurrentScreen('login');
  };

  const handleLogin = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleRegister = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleJobClick = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentScreen('jobDetails');
  };

  const handleBackFromJobDetails = () => {
    setCurrentScreen('home');
    setSelectedJobId(null);
  };

  const handleApplyJob = () => {
    // Handle job application
    console.log('Applied for job:', selectedJobId);
    // Could show a success message or navigate to applied jobs
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    switch (tab) {
      case 'home':
        setCurrentScreen('home');
        break;
      case 'saved':
        setCurrentScreen('saved');
        break;
      case 'chat':
        setCurrentScreen('chat');
        break;
      case 'notifications':
        setCurrentScreen('notifications');
        break;
      case 'profile':
        setCurrentScreen('profile');
        break;
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <OnboardingScreen onComplete={handleCompleteOnboarding} />;
      
      case 'login':
        return (
          <LoginScreen 
            onLogin={handleLogin}
            onRegister={() => setCurrentScreen('register')}
          />
        );
      
      case 'register':
        return (
          <RegisterScreen 
            onRegister={handleRegister}
            onBack={() => setCurrentScreen('login')}
          />
        );
      
      case 'home':
        return <HomeScreen onJobClick={handleJobClick} />;
      
      case 'jobDetails':
        return (
          <JobDetailsScreen 
            jobId={selectedJobId!}
            onBack={handleBackFromJobDetails}
            onApply={handleApplyJob}
          />
        );
      
      case 'saved':
      case 'chat':
      case 'notifications':
      case 'profile':
        return (
          <div className="max-w-sm mx-auto bg-background min-h-screen flex items-center justify-center">
            <div className="text-center p-8">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {currentScreen.charAt(0).toUpperCase() + currentScreen.slice(1)} Screen
              </h2>
              <p className="text-muted-foreground">
                This screen will be implemented next
              </p>
            </div>
          </div>
        );
      
      default:
        return <HomeScreen onJobClick={handleJobClick} />;
    }
  };

  const showBottomNav = ['home', 'saved', 'chat', 'notifications', 'profile'].includes(currentScreen);

  return (
    <div className="relative">
      {renderScreen()}
      {showBottomNav && (
        <BottomNav 
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default Index;
