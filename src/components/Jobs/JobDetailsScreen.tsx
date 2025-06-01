
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Clock, Star, Bookmark, BookmarkCheck, Share, Phone, MessageCircle, TrendingUp, Users, Calendar } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';

interface JobDetailsScreenProps {
  jobId: string;
  onBack: () => void;
  onApply: () => void;
}

const JobDetailsScreen = ({ jobId, onBack, onApply }: JobDetailsScreenProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Mock job data - in real app this would be fetched based on jobId
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
    applicantsCount: 12,
    viewsCount: 89,
    description: 'We are looking for a friendly and energetic server to join our beach cafe team. You will be responsible for taking orders, serving food and drinks, ensuring customer satisfaction, and maintaining a clean dining environment. This is a great opportunity for someone who enjoys working in a dynamic, beachside atmosphere with both locals and tourists.',
    requirements: [
      'Previous restaurant experience preferred but not required',
      'Good communication skills in Malayalam/English',
      'Available for 8-hour shifts (flexible timing)',
      'Friendly and customer-oriented attitude',
      'Ability to work in a fast-paced environment'
    ],
    benefits: [
      'Tips included (average ₹100-150/day)',
      'Free meals during shift',
      'Flexible timing options',
      'Weekly payments',
      'Performance bonuses',
      'Staff accommodation available'
    ],
    workingHours: 'Morning: 8 AM - 4 PM or Evening: 4 PM - 12 AM',
    contactPerson: 'Ravi Kumar',
    contactPhone: '+91 98765 43210',
    companyImage: '🏪',
    jobType: 'Part-time',
    experience: 'Entry Level',
    category: 'Restaurant'
  };

  const handleApply = () => {
    console.log('Applied for job:', jobId);
    onApply();
  };

  const handleCall = () => {
    console.log('Calling:', job.contactPhone);
  };

  const handleMessage = () => {
    console.log('Messaging:', job.contactPerson);
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold">Job Details</h1>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Share size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Job Header */}
            <div className="space-y-4">
              {job.isUrgent && (
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center bg-accent text-accent-foreground text-sm px-3 py-2 rounded-full font-medium">
                    🔥 Urgent Hiring
                  </span>
                  <span className="text-xs text-muted-foreground">High demand</span>
                </div>
              )}
              
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{job.title}</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center text-muted-foreground">
                    <span className="text-3xl mr-3">{job.companyImage}</span>
                    <div>
                      <p className="font-medium text-foreground text-lg">{job.company}</p>
                      <div className="flex items-center mt-1">
                        <Star size={14} className="text-yellow-500 mr-1" />
                        <span className="text-sm">{job.rating} ({job.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin size={16} className="mr-2" />
                      <span>{job.distance}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock size={16} className="mr-2" />
                      <span>Posted {job.postedTime}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users size={16} className="mr-2" />
                      <span>{job.applicantsCount} applied</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <TrendingUp size={16} className="mr-2" />
                      <span>{job.viewsCount} views</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay Info */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 border">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm mb-1">Payment</p>
                    <p className="text-3xl font-bold text-primary">₹{job.pay}</p>
                    <p className="text-muted-foreground text-sm">per {job.payType}</p>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-muted-foreground text-sm">Type</p>
                      <p className="font-medium text-foreground">{job.jobType}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Experience</p>
                      <p className="font-medium text-foreground">{job.experience}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-primary/20">
                  <p className="text-muted-foreground text-sm mb-1">Working Hours</p>
                  <p className="font-medium text-foreground">{job.workingHours}</p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Job Description</h3>
              <div className="text-muted-foreground leading-relaxed">
                <p className={showFullDescription ? '' : 'line-clamp-3'}>
                  {job.description}
                </p>
                <button 
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-primary font-medium mt-2 text-sm hover:underline"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                </button>
              </div>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Requirements</h3>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-3 mt-1 text-lg">•</span>
                    <span className="text-muted-foreground leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">What you'll get</h3>
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-success mr-3 mt-1 text-lg">✓</span>
                    <span className="text-muted-foreground leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Person */}
            <div className="bg-muted/30 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-foreground text-lg">{job.contactPerson}</p>
                  <p className="text-sm text-muted-foreground">Hiring Manager</p>
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm" onClick={handleCall} className="flex-1">
                    <Phone size={16} className="mr-2" />
                    Call
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleMessage} className="flex-1">
                    <MessageCircle size={16} className="mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>

            <div className="h-24"></div> {/* Spacer for fixed buttons */}
          </div>
        </div>

        {/* Fixed Bottom Actions */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 max-w-sm w-full bg-background/95 backdrop-blur-lg border-t p-4 safe-area-bottom">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSaved(!isSaved)}
              className="h-14 w-14 rounded-xl"
            >
              {isSaved ? (
                <BookmarkCheck size={20} className="text-accent" />
              ) : (
                <Bookmark size={20} />
              )}
            </Button>
            <Button 
              onClick={handleApply}
              className="flex-1 h-14 text-lg rounded-xl btn-accent font-semibold"
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
