'use client';

/**
 * SkillsMarquee.tsx
 * Infinite horizontal scrolling marquee:
 * - CSS animation (GPU-accelerated, no JS scroll loop)
 * - Seamless: two identical sets of items so the loop is invisible
 * - Pauses on hover
 * - Separator dots between items
 * - Uppercase condensed typography
 * - Fully responsive — works at any viewport width
 * - Respects prefers-reduced-motion
 */

const SKILLS = [
  'Project Planning',
  'Agile & Scrum',
  'Stakeholder Management',
  'Risk Management',
  'Team Leadership',
  'Communication',
  'Problem Solving',
  'Requirements Gathering',
  'Business Analysis',
  'Time Management',
  'Critical Thinking',
  'Process Improvement',
  'Resource Allocation',
  'Conflict Resolution',
  'Strategic Thinking',
];

function MarqueeItem({ label }: { label: string }) {
  return (
    <>
      <span className="marquee-item">{label}</span>
      <span className="marquee-sep" aria-hidden="true">·</span>
    </>
  );
}

export default function SkillsMarquee() {
  return (
    <>
      <style>{`
        .marquee-section {
          width: 100%;
          overflow: hidden;
          padding: 1.5rem 0;
          border-top: 1px solid var(--card-border);
          border-bottom: 1px solid var(--card-border);
          position: relative;
        }

        /* Edge fade masks */
        .marquee-section::before,
        .marquee-section::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 8rem;
          z-index: 2;
          pointer-events: none;
        }
        .marquee-section::before {
          left: 0;
          background: linear-gradient(to right, var(--bg) 0%, transparent 100%);
        }
        .marquee-section::after {
          right: 0;
          background: linear-gradient(to left, var(--bg) 0%, transparent 100%);
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 40s linear infinite;
          will-change: transform;
        }

        /* Pause on hover */
        .marquee-section:hover .marquee-track {
          animation-play-state: paused;
        }

        /* One full set of items */
        .marquee-set {
          display: flex;
          align-items: center;
          gap: 0;
          flex-shrink: 0;
        }

        .marquee-item {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          white-space: nowrap;
          padding: 0 1.75rem;
          transition: color 0.2s ease;
        }

        .marquee-section:hover .marquee-item {
          color: var(--fg);
        }

        .marquee-sep {
          font-size: 0.9rem;
          color: var(--card-border);
          flex-shrink: 0;
          border: 1px solid var(--card-border);
          border-radius: 50%;
          width: 6px;
          height: 6px;
          display: inline-block;
          vertical-align: middle;
          margin: 0 0;
          background: var(--muted);
          opacity: 0.35;
        }

        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
          .marquee-set {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>

      <div className="marquee-section" aria-label="Skills">
        {/* Two identical sets — when first set scrolls fully out, second is in place */}
        <div className="marquee-track">
          <div className="marquee-set">
            {SKILLS.map((s) => (
              <MarqueeItem key={s} label={s} />
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="marquee-set" aria-hidden="true">
            {SKILLS.map((s) => (
              <MarqueeItem key={`dup-${s}`} label={s} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
