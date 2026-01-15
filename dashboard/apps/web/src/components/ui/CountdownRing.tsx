interface CountdownRingProps {
  seconds: number;
  duration?: number;
}

export function CountdownRing({ seconds, duration = 3 }: CountdownRingProps) {
  const radius = 10;
  const circumference = 2 * Math.PI * radius;
  const progress = (seconds / duration) * circumference;

  return (
    <div className="relative w-6 h-6 flex items-center justify-center">
      <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
        {/* Background circle */}
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="rgba(239, 68, 68, 0.2)"
          strokeWidth="2"
        />
        {/* Progress circle */}
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
      {/* Countdown number */}
      <span className="absolute text-[10px] font-bold text-red-500">
        {seconds}
      </span>
    </div>
  );
}
