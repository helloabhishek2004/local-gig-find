
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const REDIRECT_DELAY = 2500; // ms

const EmployerJobSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/employer/dashboard");
    }, REDIRECT_DELAY);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32 flex items-center justify-center">
          {/* Animated SVG Checkmark (tick) */}
          <svg
            className="block"
            width="110"
            height="110"
            viewBox="0 0 110 110"
          >
            <circle
              cx="55"
              cy="55"
              r="50"
              fill="#eafaf4"
              stroke="#4CAF50"
              strokeWidth="5"
              style={{
                opacity: 0.5,
              }}
            />
            <path
              className="animate-check"
              d="M35 58 L50 75 L78 38"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <style>{`
            .animate-check {
              stroke-dasharray: 80;
              stroke-dashoffset: 80;
              animation: dash 0.8s cubic-bezier(.8,.2,.5,1) forwards 0.4s;
            }
            @keyframes dash {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </div>
        <h2 className="text-2xl font-semibold text-green-700 text-center animate-fade-in">Job Posted!</h2>
        <p className="text-muted-foreground text-center text-base">Job posted successfully.<br/>Redirecting to dashboard…</p>
      </div>
    </div>
  );
};

export default EmployerJobSuccess;
