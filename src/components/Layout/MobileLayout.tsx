
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  className?: string;
  showStatusBar?: boolean;
}

const MobileLayout = ({ children, className, showStatusBar = true }: MobileLayoutProps) => {
  return (
    <div className="max-w-sm mx-auto bg-background min-h-screen relative overflow-hidden">
      {showStatusBar && (
        <div className="flex justify-between items-center px-4 py-2 text-xs text-muted-foreground bg-background border-b safe-area-top">
          <span>9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-1 h-1 bg-current rounded-full"></div>
              <div className="w-1 h-1 bg-current/30 rounded-full"></div>
            </div>
            <span className="ml-1">📶</span>
            <span>🔋</span>
          </div>
        </div>
      )}
      <div className={cn("flex-1", className)}>
        {children}
      </div>
    </div>
  );
};

export default MobileLayout;
