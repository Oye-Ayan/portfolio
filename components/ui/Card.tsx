'use client';

import { ReactNode } from 'react';
import TiltCard from '../effects/TiltCard';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  tilt?: boolean;
}

export default function Card({ children, className = '', hover = true, tilt = true }: CardProps) {
  if (tilt && hover) {
    return (
      <TiltCard className={`glass-effect rounded-xl p-6 ${className}`}>
        {children}
      </TiltCard>
    );
  }

  return (
    <div className={`glass-effect rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}
