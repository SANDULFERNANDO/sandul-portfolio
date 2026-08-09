'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/animations';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
        paddingTop: scrolled ? '1.5rem' : '0',
        transition: 'padding 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? '60px' : '80px',
          width: scrolled ? '860px' : '100%',
          maxWidth: '1200px',
          padding: scrolled ? '0 1.5rem' : '0 2rem',
          margin: '0 auto',
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          border: scrolled ? '1px solid var(--card-border)' : '1px solid transparent',
          borderRadius: scrolled ? '999px' : '0px',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: scrolled ? '0 12px 40px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.05)' : 'none',
        }}
      >
        {/* Logo — Orbitron font */}
        <a
          href="#"
          data-cursor="link"
          style={{
            fontFamily: 'var(--font-orbitron), sans-serif',
            fontSize: '1rem',
            fontWeight: 700,
            color: 'var(--fg)',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            textTransform: 'lowercase', // matching reference 'dvdrod'
          }}
        >
          sandulfernando
        </a>

        {/* Right side nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Work', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                data-cursor="link"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = 'var(--fg)')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = 'var(--muted)')
                }
              >
                {item}
              </a>
            ))}
          </div>

          {/* Dark mode toggle - Pill shaped */}
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              data-cursor="link"
              style={{
                background: 'transparent',
                border: '1px solid var(--card-border)',
                borderRadius: '999px',
                padding: '0.4rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--muted)',
                transition: 'all 0.2s ease',
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--fg)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--fg)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--muted)';
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--card-border)';
              }}
            >
              <span style={{ fontSize: '0.9rem' }}>◑</span>
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
