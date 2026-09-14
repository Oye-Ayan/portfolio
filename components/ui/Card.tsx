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
      <TiltCard className={`glass-3d rounded-2xl p-6 md:p-8 ${className}`}>
        {children}
      </TiltCard>
    );
  }

  return (
    <div className={`glass-3d rounded-2xl p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}
