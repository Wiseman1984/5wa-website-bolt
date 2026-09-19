import React from 'react';

interface NeonShieldProps {
  filled?: boolean;
  size?: number;
  className?: string;
}

export const NeonShield: React.FC<NeonShieldProps> = ({ 
  filled = false, 
  size = 24,
  className = ''
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`neon-shield ${className}`}
      style={{
        filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 16px rgba(6, 182, 212, 0.4))',
      }}
    >
      <defs>
        <filter id="neon-glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Shield shape */}
      <path
        d="M12 1L3 5v7c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"
        fill={filled ? 'rgba(6, 182, 212, 0.3)' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

export const NeonShieldRow: React.FC<{
  count: number;
  filledCount: number;
  size?: number;
}> = ({ count, filledCount, size = 24 }) => {
  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="text-cyan-400"
          style={{
            textShadow: '0 0 10px rgba(6, 182, 212, 0.8), 0 0 20px rgba(6, 182, 212, 0.4)',
          }}
        >
          <NeonShield
            filled={i < filledCount}
            size={size}
          />
        </div>
      ))}
    </div>
  );
};
