
import React from 'react';
import { Clock, CheckCircle, XCircle, Eye, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: 'pending' | 'viewed' | 'interview' | 'rejected' | 'accepted';
  lastUpdate: string;
}

interface ApplicationTrackerProps {
  applications: Application[];
}

const ApplicationTracker = ({ applications }: ApplicationTrackerProps) => {
  const getStatusInfo = (status: Application['status']) => {
    switch (status) {
      case 'pending':
        return { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted/20', label: 'Pending' };
      case 'viewed':
        return { icon: Eye, color: 'text-info', bg: 'bg-info/20', label: 'Viewed' };
      case 'interview':
        return { icon: MessageCircle, color: 'text-accent', bg: 'bg-accent/20', label: 'Interview' };
      case 'accepted':
        return { icon: CheckCircle, color: 'text-success', bg: 'bg-success/20', label: 'Accepted' };
      case 'rejected':
        return { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/20', label: 'Rejected' };
      default:
        return { icon: Clock, color: 'text-muted-foreground', bg: 'bg-muted/20', label: 'Unknown' };
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
      <h3 className="font-semibold text-foreground mb-4">Application Status</h3>
      
      {applications.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-muted-foreground mb-2">No applications yet</div>
          <p className="text-sm text-muted-foreground">Start applying to jobs to track your progress here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => {
            const statusInfo = getStatusInfo(app.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={app.id} className="border border-border/50 rounded-xl p-4 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{app.jobTitle}</h4>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${statusInfo.bg}`}>
                    <StatusIcon size={14} className={statusInfo.color} />
                    <span className={`text-xs font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Applied {app.appliedDate}</span>
                  <span>Updated {app.lastUpdate}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;
