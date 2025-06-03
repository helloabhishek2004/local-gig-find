
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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bottom-nav">
      <div className="bg-card/90 backdrop-blur-lg border border-border/50 rounded-2xl shadow-lg px-2 py-3 mx-4">
        <div className="flex justify-center gap-1">
          {tabs.map(({ id, icon: Icon, label, path }) => (
            <button
              key={id}
              onClick={() => navigate(path)}
              className={cn(
                "flex flex-col items-center p-3 min-w-0 rounded-xl transition-all duration-200 hover:scale-105 hover:bg-accent/20 active:scale-95",
                activeTab === id 
                  ? "text-primary bg-primary/10 shadow-sm" 
                  : "text-muted-foreground hover:text-primary"
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

export default BottomNavWithRouter;
