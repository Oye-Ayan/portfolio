'use client';

import dynamic from 'next/dynamic';

const Hero3DScene = dynamic(
  () => import('./Hero3DScene'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 z-0" aria-hidden="true" />
    ),
  }
);

export default Hero3DScene;
