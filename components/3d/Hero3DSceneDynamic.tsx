'use client';

import dynamic from 'next/dynamic';

const Hero3DScene = dynamic(
  () => import('./Hero3DScene'),
  {
    ssr: false,
    loading: () => (
      <div
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        {/* Subtle, zero-cost CSS radial ambient glow placeholder while WebGL runtime initializes */}
        <div className="w-[320px] h-[320px] sm:w-[480px] sm:h-[480px] rounded-full bg-accent/5 blur-3xl animate-pulse" />
      </div>
    ),
  }
);

export default Hero3DScene;
