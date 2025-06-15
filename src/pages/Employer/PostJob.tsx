import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, DollarSign, Clock, Users } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';
import EmployerBottomNav from '@/components/Navigation/EmployerBottomNav';

// Define initial state for use in reset
const initialFormData = {
  jobTitle: '',
  businessName: '',
  category: '',
  location: '',
  paymentType: 'hourly',
  payment: '',
  jobType: 'part-time',
  experience: 'entry',
  workingHours: '',
  description: ''
};

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Check required fields
  const requiredFilled = [
    formData.jobTitle,
    formData.businessName,
    formData.category,
    formData.location,
    formData.payment,
    formData.description
  ].every(Boolean);

  const [posting, setPosting] = useState(false);

  const handleSubmit = async () => {
    setPosting(true);
    // Fake post: simulate success/failure
    await new Promise(r => setTimeout(r, 1750));
    setPosting(false);
    // Randomly route to success or failure for demo (replace with your real logic)
    if (Math.random() > 0.3) {
      navigate('/employer/post-job-success');
    } else {
      navigate('/employer/post-job-failure');
    }
  };

  // Handle clear all fields
  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear all job details?")) {
      setFormData(initialFormData);
    }
  };

  const categories = [
    'Restaurant & Food',
    'Delivery & Logistics',
    'Retail & Sales',
    'Cleaning & Maintenance',
    'Security',
    'Healthcare',
    'Other'
  ];

  return (
    <MobileLayout>
      <div className="flex flex-col h-screen bg-background overflow-hidden relative">
        <div className="gradient-bg-employer" />
        {/* Header */}
        <div className="flex-shrink-0 pt-safe px-4 py-6 bg-background/80 backdrop-blur-sm">
          <div className="max-w-sm mx-auto">
            <div className="flex items-center">
              {/* Removed ArrowLeft back button */}
              <h1 className="text-2xl font-bold text-foreground">Post a Job</h1>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2 pb-36">
          <div className="max-w-sm mx-auto space-y-6 animate-fade-slide-up">
            {/* Job Details */}
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="jobTitle" className="text-ios-subhead font-medium">Job Title *</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g. Delivery Boy, Kitchen Helper"
                    value={formData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    className="h-12 ios-input mt-ios-xs"
                  />
                </div>

                <div>
                  <Label htmlFor="businessName" className="text-ios-subhead font-medium">Business Name *</Label>
                  <Input
                    id="businessName"
                    placeholder="Your business name"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    className="h-12 ios-input mt-ios-xs"
                  />
                </div>

                <div>
                  <Label htmlFor="category" className="text-ios-subhead font-medium">Category *</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full h-12 ios-input mt-ios-xs bg-background border border-border rounded-ios px-3"
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="location" className="flex items-center gap-ios-sm text-ios-subhead font-medium">
                    <MapPin size={16} />
                    Location *
                  </Label>
                  <Input
                    id="location"
                    placeholder="Enter job location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="h-12 ios-input mt-ios-xs"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment & Work Details */}
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-lg">Payment & Work Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-ios-sm">
                  <div>
                    <Label className="text-ios-subhead font-medium">Payment Type</Label>
                    <select
                      value={formData.paymentType}
                      onChange={(e) => handleInputChange('paymentType', e.target.value)}
                      className="w-full h-12 ios-input mt-ios-xs bg-background border border-border rounded-ios px-3"
                    >
                      <option value="hourly">Per Hour</option>
                      <option value="daily">Per Day</option>
                      <option value="monthly">Per Month</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="payment" className="flex items-center gap-ios-sm text-ios-subhead font-medium">
                      <DollarSign size={16} />
                      Amount *
                    </Label>
                    <Input
                      id="payment"
                      type="number"
                      placeholder="0"
                      value={formData.payment}
                      onChange={(e) => handleInputChange('payment', e.target.value)}
                      className="h-12 ios-input mt-ios-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-ios-sm">
                  <div>
                    <Label className="flex items-center gap-ios-sm text-ios-subhead font-medium">
                      <Clock size={16} />
                      Job Type
                    </Label>
                    <select
                      value={formData.jobType}
                      onChange={(e) => handleInputChange('jobType', e.target.value)}
                      className="w-full h-12 ios-input mt-ios-xs bg-background border border-border rounded-ios px-3"
                    >
                      <option value="part-time">Part-time</option>
                      <option value="full-time">Full-time</option>
                      <option value="internship">Internship</option>
                      <option value="contract">Contract</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label className="flex items-center gap-ios-sm text-ios-subhead font-medium">
                      <Users size={16} />
                      Experience
                    </Label>
                    <select
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      className="w-full h-12 ios-input mt-ios-xs bg-background border border-border rounded-ios px-3"
                    >
                      <option value="entry">Entry Level</option>
                      <option value="1-2">1-2 Years</option>
                      <option value="3-5">3-5 Years</option>
                      <option value="5+">5+ Years</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="workingHours" className="text-ios-subhead font-medium">Working Hours</Label>
                  <Input
                    id="workingHours"
                    placeholder="e.g. 9 AM - 6 PM, Monday to Saturday"
                    value={formData.workingHours}
                    onChange={(e) => handleInputChange('workingHours', e.target.value)}
                    className="h-12 ios-input mt-ios-xs"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Job Description */}
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-ios-headline">Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe the job responsibilities, requirements, and any other important details..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="min-h-32 ios-input resize-none"
                />
              </CardContent>
            </Card>

            {/* Submit and Clear Buttons */}
            <div className="flex gap-3 pt-2">
              <Button 
                onClick={handleSubmit}
                className="h-12 w-1/2 text-base font-semibold btn-accent ios-button"
                disabled={!requiredFilled || posting}
              >
                {posting ? 'Posting...' : 'Post Job'}
              </Button>
              <Button
                type="button"
                variant="destructive"
                className="h-12 w-1/2 text-base font-semibold ios-button"
                onClick={handleClear}
                disabled={posting}
              >
                Clear
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <EmployerBottomNav />
      </div>
    </MobileLayout>
  );
};

export default PostJob;

// Note: This file is getting too long. Consider refactoring into smaller components for better maintainability.
