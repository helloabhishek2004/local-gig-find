
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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-card/90 backdrop-blur-lg border border-border/50 rounded-2xl shadow-lg px-2 py-3 mx-4 animate-fade-in">
        <div className="flex justify-center gap-1">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                "flex flex-col items-center p-3 min-w-0 rounded-xl transition-all duration-300 ease-out hover:scale-110 hover:bg-accent/20 active:scale-95",
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

export default BottomNav;
