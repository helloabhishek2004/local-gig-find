
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Plus, Users, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmployerBottomNavProps {
  activeTab?: string;
}

const EmployerBottomNav = ({ activeTab }: EmployerBottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', icon: Home, label: 'Home', path: '/employer/dashboard' },
    { id: 'post', icon: Plus, label: 'Post Job', path: '/employer/post-job' },
    { id: 'applications', icon: Users, label: 'Applications', path: '/employer/applications' },
    { id: 'chat', icon: MessageCircle, label: 'Chat', path: '/employer/chat' },
    { id: 'profile', icon: User, label: 'Profile', path: '/employer/profile' },
  ];

  // Determine active tab based on current path
  const getActiveTab = () => {
    const currentTab = tabs.find(tab => location.pathname === tab.path);
    return currentTab?.id || activeTab || 'home';
  };

  const currentActiveTab = getActiveTab();

  const handleNavigation = (path: string) => {
    // Use replace for smooth navigation without full page reload
    navigate(path, { replace: false });
  };

  return (
    <>
      {/* Fixed bottom navigation with proper positioning */}
      <div className="fixed bottom-0 left-0 right-0 w-full z-[1000]">
        {/* Gradient overlay for visual separation */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent h-20 pointer-events-none" />
        
        {/* Navigation container */}
        <div className="relative bg-background/90 backdrop-blur-xl border-t border-border/40 shadow-lg">
          {/* Safe area handling for iOS devices */}
          <div className="max-w-sm mx-auto px-4 py-2 pb-safe">
            <div className="flex justify-between items-center gap-1">
              {tabs.map(({ id, icon: Icon, label, path }) => {
                const isActive = currentActiveTab === id;
                
                return (
                  <button
                    key={id}
                    onClick={() => handleNavigation(path)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 min-w-0 rounded-xl transition-all duration-300 flex-1 group relative",
                      "transform-gpu", // Hardware acceleration for smoother animations
                      isActive 
                        ? "text-primary bg-primary/15 scale-105" 
                        : "text-muted-foreground hover:text-primary hover:bg-accent/10 hover:scale-102"
                    )}
                  >
                    {/* Active tab indicator */}
                    {isActive && (
                      <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full transition-all duration-300" />
                    )}
                    
                    <Icon 
                      size={20} 
                      className={cn(
                        "transition-all duration-300 mb-1",
                        isActive 
                          ? "scale-110 drop-shadow-sm" 
                          : "group-hover:scale-105",
                        "transform-gpu" // Hardware acceleration
                      )} 
                    />
                    <span 
                      className={cn(
                        "text-xs font-medium text-center leading-tight transition-all duration-300",
                        isActive 
                          ? "font-semibold" 
                          : "group-hover:font-medium"
                      )}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerBottomNav;
