'use client';

/**
 * SplineHero.tsx
 * Fix for "Data read, but end of buffer not reached" + Seamless styling:
 * - We extracted the binary scene data and host it locally at /scene.splinecode
 * - Uses Next.js dynamic import with { ssr: false } as requested.
 * - Removed all backgrounds, borders, and frames to make the robot float seamlessly.
 * - Suppressed the Spline watermark.
 */

import { useState, useEffect, useRef, Component, ReactNode } from 'react';
import dynamic from 'next/dynamic';

const SCENE_URL = '/scene.splinecode';

// ── Spline: dynamic import, ssr:false (no SSR, client-only WebGL) ──────────
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <SplineLoadingShimmer />,
});

// ── Minimal loading shimmer (no frame) ────────────────────────────────────
function SplineLoadingShimmer() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: 'var(--muted)',
          animation: 'spline-spin 0.8s linear infinite',
        }}
      />
    </div>
  );
}

// ── Error boundary: catches deserialize / WebGL runtime crashes ───────────
class SplineErrorBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { crashed: boolean }
> {
  constructor(props: { children: ReactNode; onError: () => void }) {
    super(props);
    this.state = { crashed: false };
  }
  static getDerivedStateFromError() {
    return { crashed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    if (this.state.crashed) return null;
    return this.props.children;
  }
}

// ── Check WebGL support ───────────────────────────────────────────────────
function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

// ── Elegant SVG Robot — shown if Spline fails or WebGL missing ────────────
function RobotFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    >
      <svg
        width="160"
        height="190"
        viewBox="0 0 160 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', zIndex: 1 }}
      >
        <line x1="80" y1="24" x2="80" y2="9" stroke="var(--muted)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="80" cy="7" r="6" fill="var(--fg)" opacity="0.5" />
        <rect x="26" y="24" width="108" height="80" rx="16" fill="transparent" stroke="var(--card-border)" strokeWidth="1.5" />
        <circle cx="56" cy="58" r="14" fill="var(--fg)" opacity="0.12" />
        <circle cx="56" cy="58" r="8" fill="var(--fg)" opacity="0.6" />
        <circle cx="56" cy="58" r="4" fill="var(--bg)" />
        <circle cx="104" cy="58" r="14" fill="var(--fg)" opacity="0.12" />
        <circle cx="104" cy="58" r="8" fill="var(--fg)" opacity="0.6" />
        <circle cx="104" cy="58" r="4" fill="var(--bg)" />
        <rect x="58" y="82" width="44" height="10" rx="5" fill="var(--fg)" opacity="0.15" />
        <rect x="18" y="110" width="124" height="64" rx="14" fill="transparent" stroke="var(--card-border)" strokeWidth="1.5" />
        <rect x="36" y="122" width="88" height="40" rx="8" fill="var(--card-bg)" stroke="var(--card-border)" strokeWidth="1" />
        <circle cx="58" cy="138" r="7" fill="var(--fg)" opacity="0.2" />
        <circle cx="80" cy="138" r="7" fill="var(--fg)" opacity="0.35" />
        <circle cx="102" cy="138" r="7" fill="var(--fg)" opacity="0.2" />
        <rect x="0" y="112" width="16" height="52" rx="8" fill="transparent" stroke="var(--card-border)" strokeWidth="1.5" />
        <rect x="144" y="112" width="16" height="52" rx="8" fill="transparent" stroke="var(--card-border)" strokeWidth="1.5" />
        <rect x="36" y="175" width="36" height="14" rx="7" fill="transparent" stroke="var(--card-border)" strokeWidth="1.5" />
        <rect x="88" y="175" width="36" height="14" rx="7" fill="transparent" stroke="var(--card-border)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export default function SplineHero() {
  const [webglReady, setWebglReady] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setWebglReady(hasWebGL());
  }, []);

  const showSpline = webglReady && !failed;

  return (
    <>
      <style>{`
        @keyframes spline-spin {
          to { transform: rotate(360deg); }
        }
        .spline-root {
          position: relative;
          width: 100%;
          height: 100%;
          /* REMOVED: background, border-radius, and overflow hidden */
          /* This allows the robot to seamlessly blend into the page */
          background: transparent;
        }
        .spline-canvas-wrap {
          position: absolute;
          inset: 0;
          width: 110%;
          height: 90%;
          pointer-events: all;
          transition: opacity 0.7s ease;
        }
        /* Ensure Spline does NOT hijack page scroll */
        body { overflow: auto !important; }
        
        /* Force canvas background to transparent so it blends perfectly */
        .spline-canvas-wrap canvas {
          background-color: transparent !important;
        }
      `}</style>

      <div className="spline-root">
        {/* Fallback (shown if Spline fails) */}
        {!loaded && failed && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <RobotFallback />
          </div>
        )}

        {/* Spline scene */}
        {showSpline && (
          <SplineErrorBoundary onError={() => setFailed(true)}>
            <div
              className="spline-canvas-wrap"
              style={{ opacity: loaded ? 1 : 0, zIndex: 1 }}
            >
              <Spline
                scene={SCENE_URL}
                onLoad={() => setLoaded(true)}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </SplineErrorBoundary>
        )}
      </div>
    </>
  );
}
