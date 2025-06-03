
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MobileLayout = ({ children, className }: MobileLayoutProps) => {
  return (
    <>
      <div className="gradient-bg" />
      <div className="max-w-sm mx-auto bg-background/95 backdrop-blur-sm min-h-screen relative overflow-hidden">
        <div className={cn("flex-1", className)}>
          {children}
        </div>
      </div>
    </>
  );
};

export default MobileLayout;
