
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
    navigate(path, { replace: false });
  };

  return (
    <div className="fixed bottom-ios-md left-1/2 transform -translate-x-1/2 z-50 bottom-nav">
      <div className="bg-card/95 backdrop-blur-ios border border-border/30 rounded-ios-xl shadow-ios-lg px-ios-xs py-ios-sm mx-ios-md">
        <div className="flex justify-center gap-1">
          {tabs.map(({ id, icon: Icon, label, path }) => {
            const isActive = currentActiveTab === id;
            
            return (
              <button
                key={id}
                onClick={() => handleNavigation(path)}
                className={cn(
                  "flex flex-col items-center p-ios-sm min-w-0 rounded-ios ios-button transition-all duration-200",
                  isActive 
                    ? "text-primary bg-primary/10 shadow-ios" 
                    : "text-muted-foreground hover:text-primary hover:bg-accent/10"
                )}
              >
                <Icon size={20} className="transition-transform duration-200" />
                <span className="text-ios-caption mt-1 font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmployerBottomNav;
