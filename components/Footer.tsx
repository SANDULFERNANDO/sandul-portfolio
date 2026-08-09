'use client';

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--card-border)',
        padding: '2rem 0',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--muted)',
            margin: 0,
          }}
        >
          © 2026 Sandul Fernando. All Rights Reserved.
        </p>
        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--muted)',
            margin: 0,
          }}
        >
          Think. Plan. Execute.
        </p>
      </div>
    </footer>
  );
}
