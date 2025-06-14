import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Smartphone, Palette, Bell, Shield, HelpCircle, Info, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import MobileLayout from '@/components/Layout/MobileLayout';
import ConfirmDeleteAccountDialog from "./ConfirmDeleteAccountDialog";

interface SettingsScreenProps {
  onBack: () => void;
}

type Theme = 'light' | 'dark' | 'system';

const SettingsScreen = ({ onBack }: SettingsScreenProps) => {
  const [theme, setTheme] = useState<Theme>('system');
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (selectedTheme: Theme) => {
    const root = document.documentElement;
    
    if (selectedTheme === 'system') {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', systemPrefersDark);
    } else {
      root.classList.toggle('dark', selectedTheme === 'dark');
    }
  };

  const handleThemeChange = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    applyTheme(selectedTheme);
  };

  const themeOptions = [
    { value: 'light' as Theme, label: 'Light', icon: Sun },
    { value: 'dark' as Theme, label: 'Dark', icon: Moon },
    { value: 'system' as Theme, label: 'System', icon: Smartphone },
  ];

  const settingsSections = [
    {
      title: 'Appearance',
      items: [
        {
          icon: Palette,
          label: 'Theme',
          type: 'theme' as const,
          value: theme,
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          type: 'toggle' as const,
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Shield,
          label: 'Location Services',
          type: 'toggle' as const,
          value: locationServices,
          onChange: setLocationServices,
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: HelpCircle,
          label: 'Help & Support',
          type: 'link' as const,
        },
        {
          icon: Info,
          label: 'About',
          type: 'link' as const,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          icon: LogOut,
          label: 'Sign Out',
          type: 'link' as const,
          danger: true,
        },
        {
          icon: Shield, // Use Shield or Trash for Delete
          label: 'Delete Account',
          type: 'delete' as const,
          danger: true,
        },
      ],
    },
  ];

  return (
    <MobileLayout>
      <div className="flex flex-col h-full animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-background/95 backdrop-blur-sm">
          <div className="flex items-center">
            <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2">
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-lg font-semibold ml-2">Settings</h1>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-sm mx-auto space-y-8">
            {settingsSections.map((section) => (
              <div key={section.title} className="space-y-4">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h2>
                <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
                  {section.items.map((item, index) => (
                    <div key={item.label} className={`p-4 ${index !== section.items.length - 1 ? 'border-b border-border/50' : ''}`}>
                      {item.type === 'theme' ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <item.icon size={20} className="text-primary" />
                            <span className="font-medium text-foreground">{item.label}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {themeOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => handleThemeChange(option.value)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ${
                                  theme === option.value
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border/50 hover:border-border'
                                }`}
                              >
                                <option.icon size={20} className={theme === option.value ? 'text-primary' : 'text-muted-foreground'} />
                                <span className={`text-xs font-medium ${theme === option.value ? 'text-primary' : 'text-muted-foreground'}`}>
                                  {option.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : item.type === 'toggle' ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <item.icon size={20} className="text-primary" />
                            <span className="font-medium text-foreground">{item.label}</span>
                          </div>
                          <Switch
                            checked={item.value}
                            onCheckedChange={item.onChange}
                          />
                        </div>
                      ) : item.type === 'delete' ? (
                        <ConfirmDeleteAccountDialog
                          trigger={
                            <button
                              className="w-full flex items-center justify-between group"
                              type="button"
                            >
                              <div className="flex items-center gap-3">
                                <item.icon size={20} className="text-destructive" />
                                <span className="font-medium text-destructive">{item.label}</span>
                              </div>
                            </button>
                          }
                        />
                      ) : (
                        <button className="w-full flex items-center justify-between group">
                          <div className="flex items-center gap-3">
                            <item.icon size={20} className="text-primary" />
                            <span className="font-medium text-foreground">{item.label}</span>
                          </div>
                          <ArrowLeft size={16} className="text-muted-foreground rotate-180 group-hover:translate-x-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* App Version */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SettingsScreen;
