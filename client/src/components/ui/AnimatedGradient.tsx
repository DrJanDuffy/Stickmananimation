import { ReactNode } from "react";

interface AnimatedGradientProps {
  children: ReactNode;
  className?: string;
}

export default function AnimatedGradient({ children, className = "" }: AnimatedGradientProps) {
  return (
    <div 
      className={`relative overflow-hidden animated-gradient ${className}`}
      style={{
        background: "linear-gradient(-45deg, #6C63FF, #3F3D56, #00BFA6, #6C63FF)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite"
      }}
    >
      <style jsx="true">{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0 bg-pattern"></div>
      </div>
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
        {children}
      </div>
    </div>
  );
}
