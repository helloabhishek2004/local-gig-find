import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, MapPin, DollarSign, Clock, Users } from 'lucide-react';
import MobileLayout from '@/components/Layout/MobileLayout';
import EmployerBottomNav from '@/components/Navigation/EmployerBottomNav';

const PostJob = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log('Job post data:', formData);
    navigate('/employer/manage-jobs');
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
      <div className="min-h-screen pb-24">
        {/* Header */}
        <div className="ios-navbar px-ios-lg py-ios-md border-b border-border/30">
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/employer/dashboard')}
              className="text-muted-foreground hover:text-foreground transition-colors p-ios-sm -ml-ios-sm mr-ios-sm"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-ios-title2 font-bold text-foreground">Post a Job</h1>
          </div>
        </div>

        <div className="p-ios-lg space-y-ios-lg">
          {/* Job Details */}
          <Card className="card-enhanced">
            <CardHeader>
              <CardTitle className="text-ios-headline">Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-ios-md">
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
              <CardTitle className="text-ios-headline">Payment & Work Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-ios-md">
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

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit}
            className="w-full h-12 btn-accent ios-button text-ios-body"
            disabled={!formData.jobTitle || !formData.businessName || !formData.category || !formData.location || !formData.payment}
          >
            Post Job
          </Button>
        </div>

        <EmployerBottomNav activeTab="post" />
      </div>
    </MobileLayout>
  );
};

export default PostJob;
