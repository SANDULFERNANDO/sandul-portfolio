'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { EASE } from '@/lib/animations';

interface Metric {
  value: string;
  label: string;
}

interface ProjectCardProps {
  number: string;
  tags: string[];
  title: string;
  role: string;
  description: string;
  metrics: Metric[];
  imageSrc: string;
  imageAlt: string;
  index?: number;
}

export default function ProjectCard({
  number,
  tags,
  title,
  role,
  description,
  metrics,
  imageSrc,
  imageAlt,
  index = 0,
}: ProjectCardProps) {
  return (
    <>
      <style>{`
        .project-card-inner {
          display: grid;
          grid-template-columns: 45% 55%;
          min-height: 340px;
          overflow: hidden;
        }
        .project-left {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 1.5rem;
          border-right: 1px solid var(--card-border);
        }
        .project-right {
          position: relative;
          overflow: hidden;
          background: var(--pill-bg);
          min-height: 300px;
        }
        @media (max-width: 768px) {
          .project-card-inner {
            grid-template-columns: 1fr;
          }
          .project-left {
            border-right: none;
            border-bottom: 1px solid var(--card-border);
            padding: 1.75rem;
          }
          .project-right {
            min-height: 220px;
          }
        }
      `}</style>

      <motion.article
        className="card"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ delay: index * 0.12, duration: 0.7, ease: EASE }}
      >
        <div className="project-card-inner">
          {/* ── Left: Meta + Content ── */}
          <div className="project-left">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Number + Tags row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  flexWrap: 'wrap',
                }}
              >
                <span className="project-number">{number}</span>
                <span
                  style={{
                    width: '1px',
                    height: '12px',
                    background: 'var(--card-border)',
                    flexShrink: 0,
                  }}
                />
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="pill"
                    style={{ fontSize: '0.72rem', padding: '0.3rem 0.7rem' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 'clamp(1.25rem, 2.2vw, 1.6rem)',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  color: 'var(--fg)',
                  margin: 0,
                }}
              >
                {title}
              </h3>

              {/* Role */}
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--muted)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                {role}
              </p>

              {/* Description */}
              <p
                style={{
                  fontSize: '0.875rem',
                  lineHeight: 1.65,
                  color: 'var(--muted)',
                  margin: 0,
                }}
              >
                {description}
              </p>
            </div>

            {/* ── Metrics row ── */}
            <div
              style={{
                display: 'flex',
                gap: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--card-border)',
                flexWrap: 'wrap',
              }}
            >
              {metrics.map((m) => (
                <div key={m.label} className="metric-chip">
                  <span className="metric-value">{m.value}</span>
                  <span className="metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Image ── */}
          <div className="project-right">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 55vw"
              priority={index === 0}
            />
          </div>
        </div>
      </motion.article>
    </>
  );
}
