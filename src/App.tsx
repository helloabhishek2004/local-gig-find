
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Lazy load pages for better performance
const WelcomeScreen = React.lazy(() => import("./pages/Welcome"));
const JobSeekerLogin = React.lazy(() => import("./pages/JobSeeker/Login"));
const JobSeekerRegister = React.lazy(() => import("./pages/JobSeeker/Register"));
const JobSeekerDashboard = React.lazy(() => import("./pages/JobSeeker/Dashboard"));
const JobDetails = React.lazy(() => import("./pages/JobSeeker/JobDetails"));
const SavedJobs = React.lazy(() => import("./pages/JobSeeker/SavedJobs"));
const ProfilePage = React.lazy(() => import("./pages/JobSeeker/Profile"));
const EditProfile = React.lazy(() => import("./pages/JobSeeker/EditProfile"));
const ChatPage = React.lazy(() => import("./pages/JobSeeker/Chat"));
const NotificationsPage = React.lazy(() => import("./pages/JobSeeker/Notifications"));
const SettingsPage = React.lazy(() => import("./pages/JobSeeker/Settings"));

// Employer pages
const EmployerLogin = React.lazy(() => import("./pages/Employer/Login"));
const EmployerRegister = React.lazy(() => import("./pages/Employer/Register"));
const EmployerDashboard = React.lazy(() => import("./pages/Employer/Dashboard"));
const PostJob = React.lazy(() => import("./pages/Employer/PostJob"));
const EmployerApplications = React.lazy(() => import("./pages/Employer/Applications"));
const EmployerChat = React.lazy(() => import("./pages/Employer/Chat"));
const EmployerProfile = React.lazy(() => import("./pages/Employer/Profile"));

const NotFound = React.lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading component for Suspense with smooth animation
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Welcome/Role Selection */}
              <Route path="/" element={<WelcomeScreen />} />
              
              {/* JobSeeker Routes */}
              <Route path="/jobseeker/login" element={<JobSeekerLogin />} />
              <Route path="/jobseeker/register" element={<JobSeekerRegister />} />
              <Route path="/jobseeker/dashboard" element={<JobSeekerDashboard />} />
              <Route path="/job/:jobId" element={<JobDetails />} />
              <Route path="/jobseeker/saved" element={<SavedJobs />} />
              <Route path="/jobseeker/profile" element={<ProfilePage />} />
              <Route path="/jobseeker/profile/edit" element={<EditProfile />} />
              <Route path="/jobseeker/chat" element={<ChatPage />} />
              <Route path="/jobseeker/notifications" element={<NotificationsPage />} />
              <Route path="/jobseeker/settings" element={<SettingsPage />} />
              
              {/* Employer Routes */}
              <Route path="/employer/login" element={<EmployerLogin />} />
              <Route path="/employer/register" element={<EmployerRegister />} />
              <Route path="/employer/dashboard" element={<EmployerDashboard />} />
              <Route path="/employer/post-job" element={<PostJob />} />
              <Route path="/employer/applications" element={<EmployerApplications />} />
              <Route path="/employer/chat" element={<EmployerChat />} />
              <Route path="/employer/profile" element={<EmployerProfile />} />
              
              {/* Redirect old routes for backward compatibility */}
              <Route path="/login" element={<Navigate to="/jobseeker/login" replace />} />
              <Route path="/register" element={<Navigate to="/jobseeker/register" replace />} />
              <Route path="/dashboard" element={<Navigate to="/jobseeker/dashboard" replace />} />
              
              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
