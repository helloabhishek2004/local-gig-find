
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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="bg-card/95 backdrop-blur-ios border-t border-border/50 px-2 py-3">
        <div className="flex justify-around items-center max-w-sm mx-auto">
          {tabs.map(({ id, icon: Icon, label, path }) => (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center p-2 min-w-0 rounded-ios-lg ios-button transition-all duration-200 flex-1",
                currentActiveTab === id 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/5"
              )}
            >
              <Icon size={22} className="transition-transform duration-200 mb-1" />
              <span className="text-ios-caption font-medium text-center leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerBottomNav;
