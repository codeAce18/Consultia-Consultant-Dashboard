import React from 'react';

type CircularProgressBarProps = {
  percentage: number; // Value between 0-100
  size?: number; // Size of the circle
  strokeWidth?: number; // Thickness of the progress ring
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  size = 100,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Total circumference of the circle
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {/* Background Circle */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E6E6E6" // Background circle color
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#5B52B6" // Progress color
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      {/* Text (Percentage) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#111827',
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
