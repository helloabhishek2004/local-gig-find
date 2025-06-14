
import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const REDIRECT_DELAY = 3000; // ms

const EmployerJobSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/employer/dashboard");
    }, REDIRECT_DELAY);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-200 to-yellow-200 animate-gradient-move opacity-90 z-0" />
      <div className="relative z-10 flex flex-col items-center bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl px-8 py-12 gap-6 animate-fade-slide-up border border-green-400/10">
        <div className="bg-green-500/20 rounded-full w-28 h-28 flex items-center justify-center animate-success-pop shadow-inner">
          <CheckCircle size={62} className="text-green-600 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold text-green-700 animate-fade-in">Job posted successfully!</h1>
        <p className="text-muted-foreground text-center text-lg">
          Your job is now live and visible to jobseekers. Redirecting you to your dashboard…
        </p>
        <div className="w-full flex flex-col items-center mt-2">
          <span className="text-xs text-green-800/80 animate-pulse">You will be redirected in a moment.</span>
        </div>
      </div>
      {/* Keyframes for gradient move */}
      <style>{`
        @keyframes gradient-move {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 4s ease-in-out infinite;
        }
        @keyframes success-pop {
          0% { transform: scale(0.7); opacity: 0.3; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-success-pop {
          animation: success-pop 0.6s cubic-bezier(0.4,2,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default EmployerJobSuccess;
