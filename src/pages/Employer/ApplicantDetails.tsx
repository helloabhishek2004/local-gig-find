import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Star, MapPin, Phone, Clock, Download, PhoneCall, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileLayout from "@/components/Layout/MobileLayout";
import EmployerBottomNav from "@/components/Navigation/EmployerBottomNav";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
const mockApplications = [{
  id: "1",
  jobTitle: "Restaurant Server",
  applicantName: "Rajesh Kumar",
  location: "Varkala, Kerala",
  distance: "2.3 km",
  appliedDate: "2 hours ago",
  status: "new",
  rating: 4.8,
  hasResume: true
}, {
  id: "2",
  jobTitle: "Delivery Boy",
  applicantName: "Amit Sharma",
  location: "Thiruvananthapuram",
  distance: "5.1 km",
  appliedDate: "1 day ago",
  status: "reviewed",
  rating: 4.5,
  hasResume: false
}, {
  id: "3",
  jobTitle: "Restaurant Server",
  applicantName: "Priya Nair",
  location: "Kollam, Kerala",
  distance: "8.2 km",
  appliedDate: "3 days ago",
  status: "shortlisted",
  rating: 4.9,
  hasResume: true
}];
const ApplicantDetails = () => {
  const {
    applicantId
  } = useParams<{
    applicantId: string;
  }>();
  const navigate = useNavigate();
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const application = mockApplications.find(app => app.id === applicantId);

  // Demo phone/email
  const phoneNumber = "+91 98765 43210";
  const emailAddress = "rajesh.kumar@email.com"; // You can update per applicant if needed

  if (!application) {
    return <MobileLayout>
        <div className="flex flex-col h-screen bg-background justify-center items-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-lg font-bold mb-2">Applicant Not Found</h2>
          <Button onClick={() => navigate(-1)} variant="secondary">
            Back
          </Button>
        </div>
        <EmployerBottomNav activeTab="applications" />
      </MobileLayout>;
  }
  return <MobileLayout>
      <div className="flex flex-col min-h-screen bg-background pb-[86px]">
        {/* Header */}
        <div className="flex-shrink-0 px-4 pt-safe py-6 bg-background/95 backdrop-blur-sm">
          <div className="max-w-sm mx-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft />
            </Button>
            <h1 className="text-2xl font-bold text-foreground flex-1">
              {application.applicantName}
            </h1>
          </div>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-2 pb-32">
          <div className="max-w-sm mx-auto space-y-6">
            <div className="card-enhanced p-6 mt-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {application.applicantName.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground">
                    {application.applicantName}
                  </h2>
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    <Star size={16} fill="currentColor" />
                    <span className="font-semibold">{application.rating}</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {application.location}
                  </p>
                </div>
              </div>
              <div className="space-y-3 pb-2 border-b border-border/20 mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone size={16} className="text-primary" />
                  <span>{phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={16} className="text-primary" />
                  <span>{application.location}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-muted-foreground">Applied for:</span>{" "}
                  <strong>{application.jobTitle}</strong>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock size={14} />
                  <span>{application.appliedDate}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Distance:</span>{" "}
                  {application.distance}
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>{" "}
                  <span className="capitalize">{application.status}</span>
                </div>
              </div>
              {/* Resume Section */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2 text-foreground">Resume</h3>
                {application.hasResume ? <div className="flex flex-col items-center gap-3">
                    <FileText size={42} className="text-primary" />
                    <Button asChild variant="outline" className="flex items-center gap-1">
                      <a href="#" download={`${application.applicantName}-resume.pdf`} onClick={e => {
                    e.preventDefault();
                    alert("This is a demo. Resume download not implemented.");
                  }}>
                        <Download size={16} className="mr-1" />
                        Download Resume
                      </a>
                    </Button>
                    <div className="bg-muted border border-border/20 rounded-lg p-3 w-full min-h-[64px] flex items-center justify-center">
                      <span className="text-muted-foreground text-center">
                        [ Resume preview not available in demo ]
                      </span>
                    </div>
                  </div> : <div className="text-center text-muted-foreground">
                    <FileText size={30} className="mx-auto mb-2" />
                    No resume attached to this application.
                  </div>}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons fixed at the bottom */}
        <div className="fixed bottom-[68px] left-0 w-full z-40 bg-background border-t border-border shadow-lg py-4">
          <div className="max-w-sm mx-auto flex gap-2 px-4">
            <Button variant="destructive" className="flex-1">
              Reject
            </Button>
            <Button variant="default" className="flex-1" onClick={() => setAcceptDialogOpen(true)}>
              Accept
            </Button>
            <Button variant="outline" className="flex-1 bg-amber-300 hover:bg-amber-200">
              Shortlist
            </Button>
          </div>
        </div>

        {/* Accept Dialog */}
        <Dialog open={acceptDialogOpen} onOpenChange={setAcceptDialogOpen}>
          <DialogContent className="max-w-[350px]">
            <DialogHeader>
              <DialogTitle className="pb-2">Next Steps</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 mt-3 mb-1">
              <Button asChild variant="outline" className="w-full flex items-center justify-start gap-3">
                <a href={`tel:${phoneNumber.replace(/\s+/g, "")}`} aria-label={`Call ${application.applicantName}`} onClick={() => setAcceptDialogOpen(false)}>
                  <PhoneCall size={18} />
                  Call
                </a>
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-start gap-3" onClick={() => {
              setAcceptDialogOpen(false);
              navigate("/employer/chat");
            }}>
                <MessageCircle size={18} />
                Chat
              </Button>
              <Button asChild variant="outline" className="w-full flex items-center justify-start gap-3">
                <a href={`mailto:${emailAddress}`} aria-label={`Notify ${application.applicantName} via email`} onClick={() => setAcceptDialogOpen(false)}>
                  <Mail size={18} />
                  Notify via Email
                </a>
              </Button>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setAcceptDialogOpen(false)} className="w-full mt-2">
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <EmployerBottomNav activeTab="applications" />
      </div>
    </MobileLayout>;
};
export default ApplicantDetails;