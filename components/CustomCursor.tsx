'use client';

/**
 * CustomCursor.tsx
 * Premium minimal custom cursor with:
 * - Small dot + larger ring that lags behind (magnetic feel)
 * - Scales up + blends on interactive elements (links, buttons)
 * - Scales down on click
 * - Works across light and dark modes
 * - Hidden on mobile (touch devices)
 */

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      setVisible(true);

      // Check if hovering interactive element
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = el?.closest('a, button, [data-cursor="link"], input, textarea, select, label');
      setIsPointer(!!interactive);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    // Smooth ring follow with lerp
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function animate() {
      ringX = lerp(ringX, dotX, 0.12);
      ringY = lerp(ringY, dotY, 0.12);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`;
      }

      rafId = requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    // Hide native cursor
    document.documentElement.style.cursor = 'none';

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.documentElement.style.cursor = '';
    };
  }, []);

  return (
    <>
      <style>{`
        .cursor-dot,
        .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 99999;
          will-change: transform;
          /* translate(-50%,-50%) centers on the cursor point */
        }
        /* ── Inner dot ── */
        .cursor-dot {
          width: 7.3px;
          height: 7.3px;
          border-radius: 50%;
          background: var(--fg);
          margin-left: -3px;
          margin-top: -3px;
          transition: width 0.15s ease, height 0.15s ease,
                      background 0.15s ease, margin 0.15s ease,
                      opacity 0.3s ease;
        }
        .cursor-dot.pointer {
          width: 5px;
          height: 5px;
          margin-left: -2px;
          margin-top: -2px;
          background: var(--fg);
        }
        .cursor-dot.clicking {
          width: 4px;
          height: 4px;
          margin-left: -2px;
          margin-top: -2px;
        }
        /* ── Outer ring ── */
        .cursor-ring {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid var(--fg);
          margin-left: -18px;
          margin-top: -18px;
          opacity: 0.35;
          transition: width 0.25s cubic-bezier(0.22,1,0.36,1),
                      height 0.25s cubic-bezier(0.22,1,0.36,1),
                      margin 0.25s cubic-bezier(0.22,1,0.36,1),
                      opacity 0.25s ease,
                      border-color 0.2s ease,
                      background 0.2s ease;
        }
        .cursor-ring.pointer {
          width: 52px;
          height: 52px;
          margin-left: -26px;
          margin-top: -26px;
          opacity: 0.18;
          border-color: var(--fg);
          background: var(--fg);
        }
        .cursor-ring.clicking {
          width: 28px;
          height: 28px;
          margin-left: -14px;
          margin-top: -14px;
          opacity: 0.5;
        }
        /* Hide custom cursor on touch devices */
        @media (hover: none) {
          .cursor-dot, .cursor-ring { display: none; }
        }
        /* Hide native cursor everywhere */
        *, *::before, *::after { cursor: none !important; }
      `}</style>

      <div
        ref={dotRef}
        className={`cursor-dot ${isPointer ? 'pointer' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${isPointer ? 'pointer' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{ opacity: visible ? (isPointer ? 0.18 : 0.35) : 0 }}
      />
    </>
  );
}
