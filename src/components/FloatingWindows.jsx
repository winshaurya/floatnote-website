import React, { useEffect } from 'react';

/**
 * FloatingWindows (v3)
 * - Only landscape-ish aspect ratios: 16:9, 5:5, 7:6 (per request)
 * - Increased lifetime
 * - Do not slowly fade out — they remain visible then disappear instantly
 * - Fewer windows by default (App mounts with a lower `count`)
 * - Random spawn anywhere inside #heroBOx
 *
 * Props:
 * - count (number): approximate parallel windows to start with (default 2)
 */

export default function FloatingWindows({ count = 2 }) {
  useEffect(() => {
    // inject styles once
    if (!document.getElementById('floating-windows-styles-v3')) {
      const style = document.createElement('style');
      style.id = 'floating-windows-styles-v3';
      style.innerHTML = `
      .floating-window-v3 {
        position: absolute;
        pointer-events: none;
        display: inline-flex;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 12px 14px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        color: #f7f7f8;
        background: rgba(16,16,16,0.85);
        border: 1px solid rgba(255,255,255,0.04);
        box-shadow: 0 12px 36px rgba(0,0,0,0.5);
        transform-origin: center;
        opacity: 0;
        will-change: transform, opacity;
        animation-name: floatingWindowV3;
        animation-timing-function: cubic-bezier(.2,.9,.2,1);
        animation-iteration-count: 1;
        backdrop-filter: blur(6px);
        text-align: left;
        line-height: 1.2;
      }
      /* Window stays visible (opaque) for almost entire animation then vanishes instantly at the end */
      @keyframes floatingWindowV3 {
        0% { transform: translateY(0) scale(.98); opacity: 0; filter: blur(4px); }
        12% { opacity: 1; transform: translateY(-6px) scale(1); filter: blur(0); }
        96% { opacity: 1; transform: translateY(-34px) scale(1.02); }
        99% { opacity: 1; transform: translateY(-36px) scale(1.03); }
        100% { opacity: 0; transform: translateY(-36px) scale(1.03); }
      }`;
      document.head.appendChild(style);
    }

    const container = document.getElementById('heroBOx');
    if (!container) return;

    const colors = ['#ec4899', '#06b6d4', '#f59e0b', '#60a5fa', '#34d399', '#7c3aed', '#111827', '#ef4444', '#7f1d1d'];
    const phrases = [
      'Remember to follow up later',
      'Prototype ready for review',
      'User reported a subtle bug',
      'Idea: reduce friction on signup',
      'A/B test the new CTA color',
      'Quick reminder — sync with team',
      'Deploy was successful',
      'Gather analytics for next meeting',
      'Add keyboard shortcuts',
      'Polish micro-interactions'
    ];

    // aspect choices now limited to requested ratios (landscape-like)
    const aspects = [
      { name: '16:9', ratio: 16 / 9 },
      { name: '5:5', ratio: 5 / 5 },
      { name: '7:6', ratio: 7 / 6 }
    ];

    const rand = (min, max) => Math.random() * (max - min) + min;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const hexToRgba = (hex, a = 1) => {
      if (!hex) return `rgba(20,20,20,${a})`;
      const h = hex.replace('#', '');
      const parseChannel = (s) => parseInt(s.length === 1 ? s + s : s, 16);
      if (h.length === 3) {
        return `rgba(${parseChannel(h[0])}, ${parseChannel(h[1])}, ${parseChannel(h[2])}, ${a})`;
      }
      if (h.length === 6) {
        return `rgba(${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}, ${a})`;
      }
      return `rgba(20,20,20,${a})`;
    };

    let timers = [];

    function spawnOnce() {
      if (!container) return;

      const el = document.createElement('div');
      el.className = 'floating-window-v3';

      // pick aspect and determine size range per aspect (landscape-focused)
      const aspect = pick(aspects);
      let baseW;
      if (aspect.name === '16:9') baseW = Math.round(rand(160, 340));
      else if (aspect.name === '5:5') baseW = Math.round(rand(140, 260)); // square-ish but treated as landscape per request
      else baseW = Math.round(rand(150, 300)); // 7:6 slightly wider

      const w = baseW;
      const h = Math.round(w / aspect.ratio);

      el.style.width = `${w}px`;
      el.style.height = `${h}px`;
      el.style.minWidth = `${Math.max(72, Math.round(w * 0.6))}px`;

      // color with randomized low transparency
      const color = pick(colors);
      const alpha = rand(0.05, 0.26); // randomized transparency
      const textAlpha = rand(0.85, 1.0);
      el.style.background = hexToRgba(color, alpha);
      el.style.border = `1px solid ${hexToRgba(color, Math.min(0.18, alpha + 0.06))}`;
      el.style.color = `rgba(255,255,255,${textAlpha})`;

      // decreased lifetime per request
      const duration = rand(6.5, 12.0); // shorter, quicker disappear
      el.style.animationDuration = `${duration}s`;

      // choose phrase
      el.textContent = pick(phrases);

      // position anywhere randomly inside container (allow near edges)
      const left = rand(2, 98);
      const top = rand(2, 98);
      el.style.left = `${left}%`;
      el.style.top = `${top}%`;

      // subtle random rotation/scale
      el.style.transform = `translate(-50%, -50%) rotate(${rand(-3,3)}deg) scale(${rand(0.98,1.02)})`;

      // layout text top-left with margin and larger font
      el.style.display = 'inline-flex';
      el.style.alignItems = 'flex-start';
      el.style.justifyContent = 'flex-start';
      el.style.textAlign = 'left';
      el.style.padding = '12px 14px';
      el.style.lineHeight = '1.15';
      el.style.fontSize = `${Math.max(14, Math.round(w / 14))}px`;

      container.appendChild(el);

      // remove instantly at animation end (no gradual fade)
      const onEnd = () => {
        el.removeEventListener('animationend', onEnd);
        if (el.parentNode) el.parentNode.removeChild(el);
      };
      el.addEventListener('animationend', onEnd);

      // safety cleanup slightly after end
      const t = setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, (duration + 0.6) * 1000);
      timers.push(t);

      // schedule next spawn (decrease frequency: fewer overall)
      const nextDelay = rand(1500, 8000);
      const s = setTimeout(spawnOnce, nextDelay);
      timers.push(s);
    }

    // initial burst (fewer)
    for (let i = 0; i < Math.max(1, count); i++) {
      const delay = rand(120, 1000);
      timers.push(setTimeout(spawnOnce, delay));
    }

    return () => {
      timers.forEach((x) => clearTimeout(x));
      timers = [];
      if (container) {
        Array.from(container.querySelectorAll('.floating-window-v3')).forEach((n) => n.remove());
      }
    };
  }, [count]);

  return null;
}
