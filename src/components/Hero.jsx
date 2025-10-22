import React from 'react';
import { motion } from 'framer-motion';

// Hero with left content area (big "Fnote", 5-word description and Download button)
// and the existing card pushed to the right by 200px for visual spacing.
export default function Hero({
  title = 'Fnote',
  // five-word short description requested by user
  subtitle = 'Tiny on-screen notes, instant access'
}) {
  const container = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    boxSizing: 'border-box',
    padding: '24px'
  };

  const left = {
    // use more of the left-side space so the title and CTA are clearly visible
    flex: '0 0 45%',
    maxWidth: '560px',
    paddingRight: 28,
    color: '#e6e6e8',
    boxSizing: 'border-box'
  };

  const bigTitle = {
    // made larger so the "Fnote" headline fills the left area and is unmistakable
    fontSize: '5rem',
    lineHeight: 0.96,
    fontWeight: 900,
    margin: 0,
    color: '#ffffff',
    fontFamily: 'Inter, system-ui, sans-serif',
    letterSpacing: '-0.02em'
  };

  const smallDesc = {
    color: '#cbd5e1',
    marginTop: 14,
    marginBottom: 22,
    fontSize: '1.15rem',
    maxWidth: 520
  };

  const downloadBtn = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    background: 'linear-gradient(90deg,#ff416c,#ff6b6b)',
    color: '#fff',
    padding: '14px 22px',
    borderRadius: 12,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 800,
    textDecoration: 'none',
    boxShadow: '0 10px 30px rgba(255,75,110,0.18)',
    fontSize: '1rem',
    zIndex: 50
  };

  const rightWrapper = {
    flex: '0 0 62%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    boxSizing: 'border-box'
  };

  // Existing hero card pushed 200px to the right
  const card = {
    width: '64%',
    maxWidth: 920,
    aspectRatio: '16/9',
    background: 'rgba(255,255,255,0.02)',
    borderRadius: 20,
    border: '2px solid rgba(255,255,255,0.06)',
    padding: 24,
    boxSizing: 'border-box',
    zIndex: 20,
    pointerEvents: 'auto',
    transform: 'translateX(200px)'
  };

  const cardTitle = { color: '#e6e6e8', fontSize: 28, fontWeight: 800, marginBottom: 8 };
  const cardSubtitle = { color: '#cbd5e1', marginBottom: 16 };

  // Responsive fallback: on small screens, stack vertically and remove the 200px shift
  const mobileStyles = `
    @media (max-width: 900px) {
      .hero-container { flex-direction: column; padding: 16px; }
      .hero-left { flex-basis: auto; width: 100%; max-width: none; padding-right: 0; margin-bottom: 18px; text-align: left; }
      .hero-right { flex-basis: auto; width: 100%; justify-content: center; }
      .hero-card { width: 100%; transform: translateX(0) !important; }
      .download-btn { width: 100%; justify-content: center; }
      .big-title { font-size: 2.8rem !important; text-align: left; }
    }
  `;

  return (
    <div style={{ width: '100%' }}>
      <style>{mobileStyles}</style>
      <div className="hero-container" style={container}>
        <div className="hero-left" style={left}>
            <h1 className="big-title" style={bigTitle}>{title}</h1>
            <div style={smallDesc}>{subtitle}</div>
            <a
              className="download-btn"
              style={downloadBtn}
              href="/downloads/floatnote-windows.exe"
              download
              aria-label="Download FloatNote for Windows"
            >
              <span>Download</span>
              <span style={{ fontSize: '0.95rem', opacity: 0.95 }}>⬇</span>
            </a>
        </div>

        <div className="hero-right" style={rightWrapper}>
          <div className="hero-card" style={card}>
            <div style={cardTitle}>Feature preview</div>
            <div style={cardSubtitle}>A tiny, private, local-first sticky-note overlay that sits above your desktop apps — translucency, color, and zero friction.</div>
            <div>
              <button style={{ backgroundColor: '#ec4899', color: '#fff', padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700 }}>Learn more</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
