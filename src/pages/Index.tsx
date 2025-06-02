import React, { useState } from 'react';
import OnboardingScreen from '@/components/Onboarding/OnboardingScreen';
import LoginScreen from '@/components/Auth/LoginScreen';
import RegisterScreen from '@/components/Auth/RegisterScreen';
import HomeScreen from '@/components/Jobs/HomeScreen';
import JobDetailsScreen from '@/components/Jobs/JobDetailsScreen';
import SavedJobsScreen from '@/components/Jobs/SavedJobsScreen';
import ChatScreen from '@/components/Chat/ChatScreen';
import ProfileScreen from '@/components/Profile/ProfileScreen';
import EditProfileScreen from '@/components/Profile/EditProfileScreen';
import BottomNav from '@/components/Navigation/BottomNav';
import AlertsScreen from '@/components/Alerts/AlertsScreen';
import SettingsScreen from '@/components/Settings/SettingsScreen';

type Screen = 'onboarding' | 'login' | 'register' | 'home' | 'jobDetails' | 'saved' | 'chat' | 'notifications' | 'profile' | 'editProfile' | 'settings';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');

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
    console.log('Applied for job:', selectedJobId);
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
        setPreviousScreen(currentScreen);
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

  const handleBackFromChat = () => {
    setCurrentScreen(previousScreen);
    setActiveTab(previousScreen);
  };

  const handleEditProfile = () => {
    setCurrentScreen('editProfile');
  };

  const handleSaveProfile = () => {
    setCurrentScreen('profile');
  };

  const handleSettings = () => {
    setCurrentScreen('settings');
  };

  const handleBackFromSettings = () => {
    setCurrentScreen('profile');
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
      
      case 'profile':
        return (
          <ProfileScreen 
            onEditProfile={handleEditProfile}
            onSettings={handleSettings}
          />
        );

      case 'editProfile':
        return (
          <EditProfileScreen 
            onSave={handleSaveProfile}
            onBack={() => setCurrentScreen('profile')}
          />
        );
      
      case 'saved':
        return <SavedJobsScreen onJobClick={handleJobClick} />;

      case 'chat':
        return <ChatScreen onBack={handleBackFromChat} />;

      case 'notifications':
        return <AlertsScreen />;
      
      case 'settings':
        return (
          <SettingsScreen 
            onBack={handleBackFromSettings}
          />
        );
      
      default:
        return <HomeScreen onJobClick={handleJobClick} />;
    }
  };

  // Don't show bottom nav when in chat
  const showBottomNav = ['home', 'saved', 'notifications', 'profile'].includes(currentScreen);

  return (
    <div className="relative min-h-screen">
      <div className="transition-all duration-300 ease-out">
        {renderScreen()}
      </div>
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
