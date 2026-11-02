import React from 'react';

interface NeonShieldProps {
  filled?: boolean;
  size?: number;
  className?: string;
}

function getSkullColor(filledCount: number, count: number): string {
  if (filledCount <= 1) return '#ef4444';
  if (filledCount <= Math.ceil(count / 2)) return '#f59e0b';
  if (filledCount < count) return '#22d3ee';
  return '#facc15';
}

export const NeonShield: React.FC<NeonShieldProps> = ({
  filled = false,
  size = 24,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`neon-skull ${className}`}
      aria-hidden="true"
    >
      <path
        d="M12 2.8c-4.25 0-7.5 3.25-7.5 7.55 0 2.65 1.25 4.75 3.25 6.1V20h8.5v-3.55c2-1.35 3.25-3.45 3.25-6.1 0-4.3-3.25-7.55-7.5-7.55Z"
        fill={filled ? 'currentColor' : 'transparent'}
        fillOpacity={filled ? 0.2 : 1}
      />
      <path d="M5.15 8.3c1.9-1.35 4.15-2.05 6.85-2.05s4.95.7 6.85 2.05" />
      <path d="M7.2 10.7h2.15v2.1H7.2zM14.65 10.7h2.15v2.1h-2.15z" fill="currentColor" stroke="none" />
      <path d="m11.2 13.6.8-1 .8 1-.8 1-.8-1ZM9.35 16.2v1.65M11.35 16.2v1.65M13.35 16.2v1.65M15.1 16.2v1.65" />
      <path d="M8.35 20h7.3" />
    </svg>
  );
};

export const NeonShieldRow: React.FC<{
  count: number;
  filledCount: number;
  size?: number;
}> = ({ count, filledCount, size = 24 }) => {
  const color = getSkullColor(filledCount, count);

  return (
    <div className="flex gap-2 justify-center" aria-label={`${filledCount} of ${count} skulls hardened`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={i < filledCount ? 'text-current' : 'text-slate-600'}
          style={{
            color: i < filledCount ? color : undefined,
            filter: i < filledCount ? `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color}66)` : undefined,
          }}
        >
          <NeonShield filled={i < filledCount} size={size} />
        </div>
      ))}
    </div>
  );
};
