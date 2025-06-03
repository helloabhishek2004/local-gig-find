
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Download, Trash2, CheckCircle } from 'lucide-react';

interface ResumeUploadProps {
  onResumeChange: (file: File | null) => void;
  currentResume?: string | null;
}

const ResumeUpload = ({ onResumeChange, currentResume }: ResumeUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const handleFileSelect = (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      setUploadStatus('error');
      return;
    }

    if (file.size > maxSize) {
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    
    // Simulate upload
    setTimeout(() => {
      onResumeChange(file);
      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 2000);
    }, 1500);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleRemoveResume = () => {
    onResumeChange(null);
  };

  const getStatusMessage = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Uploading resume...';
      case 'success':
        return 'Resume uploaded successfully!';
      case 'error':
        return 'Error: Please upload a PDF or DOCX file under 5MB';
      default:
        return '';
    }
  };

  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm border border-border/50">
      <h3 className="font-semibold text-foreground mb-4">Resume</h3>
      
      {currentResume ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-success/10 rounded-xl border border-success/20">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-success" />
              <div>
                <p className="font-medium text-foreground">Resume.pdf</p>
                <p className="text-sm text-muted-foreground">Uploaded successfully</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                View
              </Button>
              <Button variant="outline" size="sm" onClick={handleRemoveResume}>
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
              dragActive
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadStatus === 'uploading' ? (
              <div className="space-y-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm text-muted-foreground">Uploading resume...</p>
              </div>
            ) : uploadStatus === 'success' ? (
              <div className="space-y-3">
                <CheckCircle size={32} className="text-success mx-auto" />
                <p className="text-sm text-success font-medium">Resume uploaded successfully!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload size={32} className="text-muted-foreground mx-auto" />
                <div>
                  <p className="font-medium text-foreground mb-2">Upload your resume</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your resume here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <Button asChild variant="outline">
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            )}
          </div>
          
          {uploadStatus === 'error' && (
            <div className="text-center p-3 bg-destructive/10 rounded-lg">
              <p className="text-sm text-destructive">{getStatusMessage()}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
