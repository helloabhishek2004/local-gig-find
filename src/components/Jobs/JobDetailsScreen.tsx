
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, Star, Bookmark, BookmarkCheck, Share } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';

interface JobDetailsScreenProps {
  jobId: string;
  onBack: () => void;
  onApply: () => void;
}

const JobDetailsScreen = ({ jobId, onBack, onApply }: JobDetailsScreenProps) => {
  const [isSaved, setIsSaved] = React.useState(false);

  // Mock job data
  const job = {
    title: 'Restaurant Server',
    company: 'Beach Cafe Varkala',
    location: 'Varkala Beach, Near Lighthouse',
    distance: '1.2 km from you',
    pay: '300',
    payType: 'daily',
    postedTime: '2 hours ago',
    isUrgent: true,
    rating: 4.2,
    reviewCount: 28,
    description: 'We are looking for a friendly and energetic server to join our beach cafe team. You will be responsible for taking orders, serving food and drinks, and ensuring customer satisfaction.',
    requirements: [
      'Previous restaurant experience preferred',
      'Good communication skills in Malayalam/English',
      'Available for 8-hour shifts',
      'Friendly and customer-oriented attitude'
    ],
    benefits: [
      'Tips included',
      'Free meals during shift',
      'Flexible timing',
      'Weekly payments'
    ],
    workingHours: 'Morning: 8 AM - 4 PM',
    contactPerson: 'Ravi Kumar',
    companyImage: '🏪'
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-background">
          <button onClick={onBack} className="text-muted-foreground">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Job Details</h1>
          <button className="text-muted-foreground">
            <Share size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Job Header */}
            <div className="space-y-4">
              {job.isUrgent && (
                <span className="inline-block bg-accent text-accent-foreground text-sm px-3 py-1 rounded-full font-medium">
                  🔥 Urgent Hiring
                </span>
              )}
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">{job.title}</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-muted-foreground">
                    <span className="text-2xl mr-3">{job.companyImage}</span>
                    <div>
                      <p className="font-medium text-foreground">{job.company}</p>
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-500 mr-1" />
                        <span className="text-sm">{job.rating} ({job.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-muted-foreground">
                    <MapPin size={16} className="mr-2" />
                    <span>{job.location}</span>
                  </div>

                  <div className="flex items-center text-muted-foreground">
                    <Clock size={16} className="mr-2" />
                    <span>Posted {job.postedTime}</span>
                  </div>
                </div>
              </div>

              {/* Pay Info */}
              <div className="bg-primary/5 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Payment</p>
                    <p className="text-2xl font-bold text-primary">₹{job.pay}</p>
                    <p className="text-muted-foreground text-sm">per {job.payType}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-sm">Working Hours</p>
                    <p className="font-medium text-foreground">{job.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Job Description</h3>
              <p className="text-muted-foreground leading-relaxed">{job.description}</p>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Benefits</h3>
              <ul className="space-y-2">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-success mr-2 mt-1">✓</span>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Person */}
            <div className="bg-muted/30 rounded-xl p-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">Contact Person</h3>
              <p className="text-muted-foreground">{job.contactPerson}</p>
              <p className="text-sm text-muted-foreground">Hiring Manager</p>
            </div>

            <div className="h-20"></div> {/* Spacer for fixed buttons */}
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-background border-t p-4 safe-area-bottom">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
              className="h-12 w-12"
            >
              {isSaved ? (
                <BookmarkCheck size={20} className="text-accent" />
              ) : (
                <Bookmark size={20} />
              )}
            </Button>
            <Button 
              onClick={onApply}
              className="flex-1 h-12 text-lg btn-accent"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default JobDetailsScreen;
