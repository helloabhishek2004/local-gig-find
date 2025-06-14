
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const REDIRECT_DELAY = 3000; // ms

const EmployerJobFailure = () => {
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
          {/* Animated SVG Cross */}
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
              fill="#fff0f0"
              stroke="#FF6B6B"
              strokeWidth="5"
              style={{
                opacity: 0.4,
              }}
            />
            <path
              className="animate-cross"
              d="M38 38 L72 72"
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              className="animate-cross"
              d="M72 38 L38 72"
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="8"
              strokeLinecap="round"
            />
          </svg>
          <style>{`
            .animate-cross {
              stroke-dasharray: 50;
              stroke-dashoffset: 50;
              animation: dash-cross 0.6s cubic-bezier(.8,.2,.5,1) forwards;
            }
            .animate-cross:nth-of-type(2) {
              animation-delay: 0.33s;
            }
            @keyframes dash-cross {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </div>
        <h2 className="text-2xl font-semibold text-red-600 text-center animate-fade-in">Job Post Failed</h2>
        <p className="text-muted-foreground text-center text-base">Something went wrong.<br/>Redirecting to dashboard…</p>
      </div>
    </div>
  );
};

export default EmployerJobFailure;
