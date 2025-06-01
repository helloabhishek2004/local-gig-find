
import React from 'react';
import { Home, Bookmark, MessageCircle, Bell, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'saved', icon: Bookmark, label: 'Saved' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'notifications', icon: Bell, label: 'Alerts' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-card border-t safe-area-bottom">
      <div className="flex justify-around py-2">
        {tabs.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={cn(
              "flex flex-col items-center p-2 min-w-0 flex-1",
              activeTab === id ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Icon size={24} />
            <span className="text-xs mt-1 truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
