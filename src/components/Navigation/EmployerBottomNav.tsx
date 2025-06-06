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
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-card/95 backdrop-blur-lg border-t border-border/20 shadow-lg">
      <div className="max-w-sm mx-auto px-4 py-3">
        <div className="flex justify-center gap-1">
          {tabs.map(({ id, icon: Icon, label, path }) => (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center p-2 min-w-0 rounded-lg ios-button transition-all duration-200 flex-1",
                currentActiveTab === id 
                  ? "text-primary bg-primary/10 shadow-sm" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/10"
              )}
            >
              <Icon size={20} className="transition-transform duration-200" />
              <span className="text-xs mt-1 font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerBottomNav;
