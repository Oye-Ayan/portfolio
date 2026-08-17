/**
 * opengraph-image.tsx — Dynamic Open Graph Image Generation
 * 
 * Next.js 14 generates this image at build time.
 * When your site is shared on LinkedIn, Facebook, Twitter, WhatsApp, etc.,
 * this image appears as the preview card.
 * 
 * Size: 1200x630 (standard OG image dimensions)
 */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Muhammad Ayan Khan — Software Engineer & Flutter Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a0a0b 0%, #111113 40%, #0a0a0b 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle accent gradient orb */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100, 217, 154, 0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(100, 217, 154, 0.08) 0%, transparent 70%)',
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#64d99a',
              boxShadow: '0 0 20px rgba(100, 217, 154, 0.6)',
            }}
          />
          <span
            style={{
              fontSize: '18px',
              color: '#64d99a',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Software Engineer & Flutter Developer
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 800,
            color: '#ececee',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '24px',
            display: 'flex',
          }}
        >
          Muhammad Ayan Khan
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '22px',
            color: '#7a7a80',
            maxWidth: '700px',
            lineHeight: 1.5,
            display: 'flex',
          }}
        >
          Building high-performance mobile & web applications with clean architecture, robust backends, and AI integration.
        </div>

        {/* Bottom tech stack */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '40px',
            flexWrap: 'wrap',
          }}
        >
          {['Flutter', 'Firebase', 'Java', 'Spring', 'Python', 'TensorFlow'].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#7a7a80',
                  fontSize: '14px',
                  fontWeight: 500,
                  display: 'flex',
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>

        {/* Bottom border accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, #64d99a, transparent)',
          }}
        />

        {/* URL watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            right: '80px',
            fontSize: '14px',
            color: '#4a4a50',
            fontWeight: 500,
            display: 'flex',
          }}
        >
          muhammad-ayan-khan.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
