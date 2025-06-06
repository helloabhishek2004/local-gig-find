
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
    <div className="fixed bottom-0 left-0 right-0 z-[100] pointer-events-none">
      {/* Gradient overlay background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-transparent h-24 pointer-events-none" />
      
      {/* Navigation container */}
      <div className="relative bg-background/80 backdrop-blur-xl border-t border-border/30 pointer-events-auto">
        <div className="max-w-sm mx-auto px-4 py-2 safe-area-bottom">
          <div className="flex justify-between items-center gap-2">
            {tabs.map(({ id, icon: Icon, label, path }) => (
              <button
                key={id}
                onClick={() => navigate(path)}
                className={cn(
                  "flex flex-col items-center p-3 min-w-0 rounded-xl transition-all duration-200 flex-1 group",
                  currentActiveTab === id 
                    ? "text-primary bg-primary/10" 
                    : "text-muted-foreground hover:text-primary hover:bg-accent/10"
                )}
              >
                <Icon 
                  size={20} 
                  className={cn(
                    "transition-all duration-200 mb-1",
                    currentActiveTab === id ? "scale-110" : "group-hover:scale-105"
                  )} 
                />
                <span className="text-xs font-medium text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerBottomNav;
