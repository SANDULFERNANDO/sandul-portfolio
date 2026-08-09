'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/animations';

const PROJECTS = [
  {
    number: '01',
    tags: ['AI', 'Healthcare', 'Team Leadership'],
    title: 'StellarX – Tinea Diagnostic System',
    role: 'Team Leader',
    description:
      "AI-powered diagnostic system designed to assist frontline healthcare workers in accurately detecting tinea (ringworm) infections in Sri Lanka's Dry Zone. Combines a hybrid Convolutional Neural Network with structured clinical symptom data through a fusion layer for higher diagnostic specificity.",
    metrics: [
      { value: '5', label: 'Team members' },
      { value: 'CNN', label: 'Hybrid model' },
      { value: '94%+', label: 'Accuracy target' },
    ],
    imageSrc: '/stellarx_mockup.jpg',
    imageAlt: 'StellarX Tinea Diagnostic System app interface',
  },
  {
    number: '02',
    tags: ['Android', 'Productivity', 'Java'],
    title: 'Breaky – Study Productivity App',
    role: 'Authentication · Timer · Session Management',
    description:
      'Android study productivity app that helps students manage focused study sessions with timed breaks. Features countdown timer, subject tracking, session history, user authentication, dark/light theme, and local SQLite storage. Built with Java and Material Design 3.',
    metrics: [
      { value: '100%', label: 'Auth flow' },
      { value: 'MD3', label: 'Design system' },
      { value: 'SQLite', label: 'Local storage' },
    ],
    imageSrc: '/breaky_mockup.jpg',
    imageAlt: 'Breaky study productivity app interface',
  },
];

import ProjectCard from './ProjectCard';

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="container">
        {/* Section header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-label" style={{ marginBottom: '0.75rem', display: 'block' }}>
            Selected Projects
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
            Work
          </motion.h2>
        </div>

        {/* Project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.number} {...project} index={i} />
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            marginTop: '2.5rem',
            fontSize: '0.85rem',
            color: 'var(--muted)',
            lineHeight: 1.6,
            maxWidth: '480px',
          }}
        >
          These are selected academic and personal projects reflecting my ability to plan, lead, and ship working products.
        </motion.p>
      </div>
    </section>
  );
}
