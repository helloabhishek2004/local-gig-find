
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Bookmark, MessageCircle, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavWithRouter = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', icon: Home, label: 'Home', path: '/jobseeker/dashboard' },
    { id: 'saved', icon: Bookmark, label: 'Saved', path: '/jobseeker/saved' },
    { id: 'chat', icon: MessageCircle, label: 'Chat', path: '/jobseeker/chat' },
    { id: 'notifications', icon: Bell, label: 'Alerts', path: '/jobseeker/notifications' },
    { id: 'profile', icon: User, label: 'Profile', path: '/jobseeker/profile' },
  ];

  // Determine active tab based on current path
  const getActiveTab = () => {
    const currentTab = tabs.find(tab => location.pathname === tab.path);
    return currentTab?.id || 'home';
  };

  const activeTab = getActiveTab();

  return (
    <div className="fixed bottom-ios-md left-1/2 transform -translate-x-1/2 z-50 bottom-nav">
      <div className="bg-card/95 backdrop-blur-ios border border-border/30 rounded-ios-xl shadow-ios-lg px-ios-xs py-ios-sm mx-ios-md">
        <div className="flex justify-center gap-1">
          {tabs.map(({ id, icon: Icon, label, path }) => (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center p-ios-sm min-w-0 rounded-ios ios-button transition-all duration-200",
                activeTab === id 
                  ? "text-primary bg-primary/10 shadow-ios" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/10"
              )}
            >
              <Icon size={20} className="transition-transform duration-200" />
              <span className="text-ios-caption mt-1 font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavWithRouter;
