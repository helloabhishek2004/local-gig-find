
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Smartphone, Palette, Bell, Shield, HelpCircle, Info, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import MobileLayout from '@/components/Layout/MobileLayout';

type Theme = 'light' | 'dark' | 'system';

const Settings = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>('system');
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
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
      title: 'Notifications',
      items: [
        {
          icon: Bell,
          label: 'Push Notifications',
          type: 'toggle' as const,
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Bell,
          label: 'Email Notifications',
          type: 'toggle' as const,
          value: emailNotifications,
          onChange: setEmailNotifications,
        },
      ],
    },
    {
      title: 'Privacy',
      items: [
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
          action: () => console.log('Help & Support'),
        },
        {
          icon: Info,
          label: 'About',
          type: 'link' as const,
          action: () => console.log('About'),
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
          action: () => navigate('/'),
          danger: true,
        },
      ],
    },
  ];

  return (
    <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background animate-fade-in">
        {/* Header */}
        <div className="flex-shrink-0 px-4 pt-12 pb-4 ios-navbar safe-area-top">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/employer/profile')} 
                className="text-primary hover:text-primary/80 transition-colors p-2 -ml-2 ios-button rounded-full"
              >
                <ArrowLeft size={24} />
              </button>
              <h1 className="text-2xl font-bold ml-2">Settings</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-24">
          <div className="max-w-sm mx-auto space-y-8">
            {settingsSections.map((section) => (
              <div key={section.title} className="space-y-4 animate-fade-in">
                <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider px-2">
                  {section.title}
                </h2>
                <div className="card-enhanced overflow-hidden">
                  {section.items.map((item, index) => (
                    <div 
                      key={item.label} 
                      className={`p-4 ${index !== section.items.length - 1 ? 'border-b border-border/30' : ''}`}
                    >
                      {item.type === 'theme' ? (
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <item.icon size={18} className="text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{item.label}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-3 ml-11">
                            {themeOptions.map((option) => (
                              <button
                                key={option.value}
                                onClick={() => handleThemeChange(option.value)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200 ios-button ${
                                  theme === option.value
                                    ? 'border-primary bg-primary/10 scale-105'
                                    : 'border-border/50 hover:border-border hover:scale-105'
                                }`}
                              >
                                <option.icon size={18} className={theme === option.value ? 'text-primary' : 'text-muted-foreground'} />
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
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                              <item.icon size={18} className="text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{item.label}</span>
                          </div>
                          <Switch
                            checked={item.value}
                            onCheckedChange={item.onChange}
                          />
                        </div>
                      ) : (
                        <button 
                          onClick={item.action}
                          className="w-full flex items-center justify-between group ios-button rounded-xl p-2 -m-2 hover:bg-accent/5 transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.danger ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                              <item.icon size={18} className={item.danger ? 'text-destructive' : 'text-primary'} />
                            </div>
                            <span className={`font-medium ${item.danger ? 'text-destructive' : 'text-foreground'}`}>{item.label}</span>
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
            <div className="text-center pb-8">
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Settings;
