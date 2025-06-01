
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import MobileLayout from '@/components/Layout/MobileLayout';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTPVerification = ({ phoneNumber, onVerified, onBack }: OTPVerificationProps) => {
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOTPChange = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      // Auto-verify when 6 digits are entered
      setTimeout(() => {
        console.log('OTP entered:', value);
        onVerified();
      }, 500);
    }
  };

  const handleResendOTP = () => {
    console.log('Resending OTP to:', phoneNumber);
    setCountdown(30);
    setCanResend(false);
    setOtp('');
  };

  const maskedPhone = phoneNumber.replace(/(\+91\s?)(\d{2})(\d{4})(\d{4})/, '$1$2****$4');

  return (
    <MobileLayout>
      <div className="flex flex-col h-full safe-area-top">
        {/* Header */}
        <div className="flex items-center px-4 py-3 border-b border-border/50">
          <button onClick={onBack} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-semibold ml-2">Verify Phone</h1>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-8 flex flex-col justify-center">
          <div className="max-w-sm mx-auto space-y-8 text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle size={32} className="text-primary" />
            </div>

            {/* Title and Description */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-foreground">Enter Verification Code</h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                We've sent a 6-digit code to
              </p>
              <p className="text-foreground font-semibold text-lg">{maskedPhone}</p>
            </div>

            {/* OTP Input */}
            <div className="space-y-6">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={handleOTPChange}
                  className="gap-3"
                >
                  <InputOTPGroup className="gap-3">
                    <InputOTPSlot index={0} className="w-12 h-12 text-lg font-semibold border-2 rounded-lg" />
                    <InputOTPSlot index={1} className="w-12 h-12 text-lg font-semibold border-2 rounded-lg" />
                    <InputOTPSlot index={2} className="w-12 h-12 text-lg font-semibold border-2 rounded-lg" />
                    <InputOTPSlot index={3} className="w-12 h-12 text-lg font-semibold border-2 rounded-lg" />
                    <InputOTPSlot index={4} className="w-12 h-12 text-lg font-semibold border-2 rounded-lg" />
                    <InputOTPSlot index={5} className="w-12 h-12 text-lg font-semibold border-2 rounded-lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Resend Section */}
              <div className="space-y-3">
                {!canResend ? (
                  <p className="text-sm text-muted-foreground">
                    Resend code in <span className="font-semibold text-foreground">{countdown}s</span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    className="text-primary font-semibold text-sm hover:text-primary/80 transition-colors"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </div>

            {/* Verify Button */}
            <Button 
              onClick={onVerified}
              disabled={otp.length !== 6}
              className="w-full h-14 text-lg font-semibold btn-accent rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Verify & Continue
            </Button>

            {/* Help Text */}
            <p className="text-xs text-muted-foreground">
              Didn't receive the code? Check your SMS or try calling us.
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default OTPVerification;
