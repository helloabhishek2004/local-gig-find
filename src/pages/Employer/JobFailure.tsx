
import React, { useEffect } from "react";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const REDIRECT_DELAY = 4000; // ms

const EmployerJobFailure = () => {
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
      <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-100 to-yellow-100 animate-gradient-move opacity-90 z-0" />
      <div className="relative z-10 flex flex-col items-center bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl px-8 py-12 gap-6 animate-fade-slide-up border border-red-400/10">
        <div className="bg-red-400/20 rounded-full w-28 h-28 flex items-center justify-center animate-fail-pop shadow-inner">
          <XCircle size={62} className="text-red-600 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold text-red-700 animate-fade-in">Job post failed</h1>
        <p className="text-muted-foreground text-center text-lg">
          Something went wrong. Please try again later. Redirecting you to your dashboard…
        </p>
        <div className="w-full flex flex-col items-center mt-2">
          <span className="text-xs text-red-700/70 animate-pulse">You will be redirected in a moment.</span>
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
        @keyframes fail-pop {
          0% { transform: scale(0.7); opacity: .4; }
          60% { transform: scale(1.12); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-fail-pop {
          animation: fail-pop 0.7s cubic-bezier(0.4,2,0.2,1);
        }
      `}</style>
    </div>
  );
};

export default EmployerJobFailure;
