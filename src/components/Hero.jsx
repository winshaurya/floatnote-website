import React from 'react';
import { motion } from 'framer-motion';

// Clean, minimal Hero component. App.js handles overall placement; this component renders the visual hero card.
export default function Hero({ title = 'Fnote', subtitle = 'A tiny, private, local-first sticky-note overlay that sits above your desktop apps — translucency, color, and zero friction.' }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div style={{ width: '64%', maxWidth: 920, aspectRatio: '16/9', background: 'rgba(255,255,255,0.02)', borderRadius: 20, border: '2px solid rgba(255,255,255,0.06)', padding: 24, boxSizing: 'border-box', zIndex: 30, pointerEvents: 'auto' }}>
          <div style={{ color: '#e6e6e8', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{title}</div>
          <div style={{ color: '#cbd5e1', marginBottom: 16 }}>{subtitle}</div>
          <div>
            <button style={{ backgroundColor: '#ec4899', color: '#fff', padding: '10px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 700 }}>Learn more</button>
          </div>
        </div>
      </div>
    </div>
  );
}
