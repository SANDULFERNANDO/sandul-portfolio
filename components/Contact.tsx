'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { EASE } from '@/lib/animations';

const SOCIAL_LINKS = [
  {
    label: 'Email',
    href: 'mailto:sandulfernando.pm@gmail.com',
    display: 'sandulfernando.pm@gmail.com',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <polyline points="2,4 12,13 22,4" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sandul-fernando18/',
    display: 'Sandul Fernando',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href: 'https://github.com/SANDULFERNANDO',
    display: 'SANDULFERNANDO',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sandul_fernando_/',
    display: 'sandul_fernando_',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xjkbdkle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .contact-name-email-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
        @media (max-width: 480px) {
          .contact-name-email-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section id="contact" className="section" style={{ paddingBottom: '5rem' }}>
        <div className="container">
          {/* Big CTA heading */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{ marginBottom: '4rem' }}
          >
            <span
              className="section-label"
              style={{ marginBottom: '0.75rem', display: 'block' }}
            >
              Let&apos;s connect
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: 'var(--fg)',
                margin: 0,
              }}
            >
              Say hi!
              <br />
              Let&apos;s talk →
            </h2>
          </motion.div>

          {/* Two-column: Form + Social */}
          <div className="contact-grid">
            {/* ── Contact Form ── */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div className="contact-name-email-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label
                    htmlFor="contact-name"
                    style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--muted)' }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label
                    htmlFor="contact-email"
                    style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--muted)' }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label
                  htmlFor="contact-message"
                  style={{ fontSize: '0.78rem', fontWeight: 500, color: 'var(--muted)' }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  className="form-input"
                  placeholder="Tell me about your project, role, or just say hello…"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  style={{ resize: 'vertical', minHeight: '130px' }}
                />
              </div>

              <button
                type="submit"
                id="contact-submit"
                className="btn-primary"
                disabled={status === 'sending'}
                style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
                {status !== 'sending' && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12,5 19,12 12,19" />
                  </svg>
                )}
              </button>

              {status === 'success' && (
                <p style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 500 }}>
                  ✓ Message sent! I&apos;ll be in touch soon.
                </p>
              )}
              {status === 'error' && (
                <p style={{ fontSize: '0.85rem', color: '#dc2626' }}>
                  Something went wrong. Email me directly at sandulfernando.pm@gmail.com
                </p>
              )}
            </motion.form>

            {/* ── Social Links ── */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            >
              <span
                className="section-label"
                style={{ marginBottom: '1rem', display: 'block' }}
              >
                Find me on
              </span>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    padding: '0.875rem 1rem',
                    borderRadius: '12px',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    textDecoration: 'none',
                    color: 'var(--fg)',
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  <span style={{ color: 'var(--muted)', flexShrink: 0 }}>{link.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '1px' }}>
                      {link.label}
                    </div>
                    <div
                      style={{
                        color: 'var(--fg)',
                        fontSize: '0.82rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {link.display}
                    </div>
                  </div>
                  <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: '0.8rem', flexShrink: 0 }}>
                    →
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
