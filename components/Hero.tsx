'use client';

import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { EASE } from '@/lib/animations';
import SplineHero from './SplineHero';

export default function Hero() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <style>{`
        .hero-section {
          min-height: 100vh;
          padding-top: 80px;
          display: flex;
          flex-direction: column;
        }
        .hero-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
          padding-top: 2rem;
          padding-bottom: 2rem;
          max-width: 1300px;
        }
        .hero-robot-wrap {
          height: 650px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
        }
          .hero-grid {
            grid-template-columns: 1fr 1fr;
          }
          .hero-robot-wrap {
            height: 600px;
          }
        }
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr;
            padding-top: 2rem;
            gap: 0;
          }
          .hero-robot-wrap {
            height: 400px;
            order: -1; /* robot above text on mobile */
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          .hero-robot-wrap {
            height: 320px;
          }
        }
      `}</style>

      <section id="hero" className="hero-section">
        <div className="container hero-grid">

          {/* ── Left: Text ── */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{
                display: 'block',
                fontSize: '0.9rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                fontWeight: 600,
                marginBottom: '1rem'
              }}
            >
              Aspiring Project Manager
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontSize: 'clamp(4rem, 9.5vw, 9rem)', // Massively scaled up
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: 'var(--fg)',
                margin: '0 0 2rem 0',
              }}
            >
              Think.
              <br />
              Plan.
              <br />
              Execute.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
              style={{
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: 'var(--muted)',
                maxWidth: '520px',
                margin: '0 0 1rem 0',
                fontWeight: 400,
              }}
            >
              Turning complex technical ideas into structured, successful outcomes.
            </motion.p>

            {/* Location + Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
              style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '9999px',
                  background: 'transparent',
                  border: '1px solid #22c55e',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'var(--fg)',
                  textTransform: 'uppercase'
                }}
              >
                <span
                  className="animate-pulse-dot"
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#22c55e',
                    display: 'inline-block',
                    boxShadow: '0 0 8px rgba(34,197,94,0.6)'
                  }}
                />
                Available for work
              </span>

              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase'
                }}
              >
                Colombo, Sri Lanka
              </span>
            </motion.div>
          </div>

          {/* ── Right: 3D Robot (SplineHero wrapper) ── */}
          <motion.div
            className="hero-robot-wrap"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.9, ease: EASE }}
          >
            <div style={{ width: '100%', height: '100%', position: 'relative', transform: 'scale(1.2)' }}>
              <SplineHero />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
