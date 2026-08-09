'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/animations';
import Image from 'next/image';

const EXPERIENCE = [
  {
    title: 'BSc Information Technology',
    org: 'Rajarata University of Sri Lanka',
    period: '3rd Year (Final Year)',
  },
];

const CERTIFICATIONS = [
  {
    title: 'Foundations of Project Management',
    org: 'Google',
    period: '2026',
  },
  {
    title: 'Business Analysis Basics',
    org: 'Simplilearn',
    period: '2026',
  },
];

const SKILLS = [
  'Project Planning',
  'Agile & Scrum',
  'Risk Management',
  'Stakeholder Management',
  'Team Leadership',
  'Business Analysis',
  'Requirements Gathering',
  'Python',
  'Good Vibes',
  'SQL',
];

const description = "I’m an IT undergraduate building my path toward technical project management. I’m interested in the space where technology, people, and execution meet, turning ideas into clear plans and helping teams move them forward. My background in competitive team sports has shaped how I lead, communicate, and make decisions under pressure, qualities I bring to every project I work on.";

export default function About() {
  return (
    <>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: start;
        }
        .profile-image-wrap {
          position: relative;
          width: 100%;
          max-width: 320px;
          border-radius: 20px;
          overflow: hidden;
          background: var(--card-bg);
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5);
          border: 1px solid var(--card-border);
          margin-bottom: 2.5rem;
        }
        .profile-image-wrap::after {
          content: '';
          position: absolute;
          inset: 0;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
          border-radius: 20px;
          pointer-events: none;
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
          .profile-image-wrap {
            max-width: 100%;
          }
        }
      `}</style>

      <section id="about" className="section">
        <div className="container">
          {/* Section header */}
          <div style={{ marginBottom: '4rem' }}>
            <span
              className="section-label"
              style={{ marginBottom: '0.75rem', display: 'block' }}
            >
              A bit about me
            </span>
            <motion.h2
              style={{
                fontFamily: 'var(--font-orbitron), sans-serif',
                fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-0.02em',
                color: 'var(--fg)',
                margin: 0,
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              About
            </motion.h2>
          </div>

          {/* Two-column layout */}
          <div className="about-grid">
            {/* ── Left: Photo + Story ── */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              <motion.div
                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, ease: EASE }}
                className="profile-image-wrap"
              >
                <Image 
                  src="/profile.png"
                  alt="Sandul Fernando"
                  width={600}
                  height={800}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block',
                    filter: 'grayscale(100%) contrast(1.1)', // Matches premium high-contrast dark aesthetic
                    transition: 'filter 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.filter = 'grayscale(0%) contrast(1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.filter = 'grayscale(100%) contrast(1.1)')}
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: 0.2, duration: 0.6, ease: EASE }}
                style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: 'var(--muted)',
                  margin: 0,
                  maxWidth: '480px',
                }}
              >
                {description}
              </motion.p>
            </div>

            {/* ── Right: Experience + Certs + Skills ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
            >
              {/* Education */}
              <div>
                <span
                  className="section-label"
                  style={{ marginBottom: '1.25rem', display: 'block' }}
                >
                  Education
                </span>
                {EXPERIENCE.map((item) => (
                  <div key={item.title} className="timeline-item">
                    <span className="timeline-title">{item.title}</span>
                    <span className="timeline-sub">{item.org}</span>
                    <span className="timeline-sub" style={{ fontSize: '0.72rem' }}>
                      {item.period}
                    </span>
                  </div>
                ))}
              </div>

              {/* Certifications */}
              <div>
                <span
                  className="section-label"
                  style={{ marginBottom: '1.25rem', display: 'block' }}
                >
                  Certifications
                </span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {CERTIFICATIONS.map((cert) => (
                    <div key={cert.title} className="timeline-item">
                      <span className="timeline-title">{cert.title}</span>
                      <span className="timeline-sub">{cert.org}</span>
                      <span
                        className="timeline-sub"
                        style={{ fontSize: '0.72rem' }}
                      >
                        {cert.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <span
                  className="section-label"
                  style={{ marginBottom: '1.25rem', display: 'block' }}
                >
                  Skills
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {SKILLS.map((skill) => (
                    <span key={skill} className="pill" style={{ fontSize: '0.78rem' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
