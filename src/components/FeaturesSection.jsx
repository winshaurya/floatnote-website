// FeaturesSection.jsx
import React, { useRef, useEffect } from 'react';
import Typed from 'typed.js';

/**
 * FeaturesSection - Displays the FloatNote features in an attractive grid layout.
 * Each feature card includes an emoji, title, and description.
 * Designed for good UX/UI with hover effects and responsive design.
 */

export default function FeaturesSection() {
  const elRef = useRef(null);
  const typedRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) return;
    const options = {
      strings: [
        "What is FloatNote?",
        "What is ?",
        "What is Float No?",
        "What is Flo?",
        "What is FloatNote?",

        "What is Floa?",
        "What is Float Not?",
        "What is FloatNote?",
        "What is F?",
        "What is FloatNote?",
    
        "What is Float?",
        "What is Float N?"

      ],
      typeSpeed: 130,
      backSpeed: 60,
      backDelay: 700,
      loop: true,
      showCursor: false,
      smartBackspace: true,
    };
    typedRef.current = new Typed(elRef.current, options);
    return () => {
      typedRef.current && typedRef.current.destroy();
    };
  }, []);

  const features = [
    {
      emoji: '🟦',
      title: 'Local Storage',
      description: 'Your notes are saved instantly on your computer using SQLite. No internet needed. Open FloatNote and your notes are always there.'
    },
    {
      emoji: '🔵',
      title: 'Pin and Organize',
      description: 'Click the pin icon to keep a note on top. Right-click any note for options like delete or pin. Pinned notes always stay visible.'
    },
    {
      emoji: '⚪',
      title: 'Themes and Fonts',
      description: 'Pick a color, set opacity, and choose your favorite font for each note. Select "Glass" for a see-through look or "Matte" for solid color.'
    },
    {
      emoji: '🔷',
      title: 'Resizable Widgets',
      description: 'Drag the edges to resize any note. Use notes as timers, clocks, or quick reminders. More widgets are coming soon.'
    },
    {
      emoji: '🟦',
      title: 'Profiles and Settings',
      description: 'Set your default size, color, and font. Every new note uses your preferences. Change settings anytime in the menu.'
    },
    {
      emoji: '⚪',
      title: 'Keyboard Shortcuts',
      description: 'Press Ctrl+\\ to create a new note instantly. Use shortcuts to switch, hide, or pin notes without touching your mouse.'
    }
  ];

  const styles = {
    section: {
      padding: '60px 20px',
      background: 'transparent',
      color: '#fff',
      textAlign: 'center',
      fontFamily: 'Courier New, Courier, monospace'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '10px',
      color: '#fff'
    },
    subtitle: {
      fontSize: '1.2rem',
      color: '#fff',
      marginBottom: '50px',
      maxWidth: '600px',
      margin: '0 auto 50px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    card: {
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '16px',
      padding: '16px 16px',
      textAlign: 'left',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'default',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
    },
    emoji: {
      fontSize: '2.5rem',
      marginBottom: '15px',
      display: 'block'
    },
    cardTitle: {
      fontSize: '1.4rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#fff'
    },
    cardDesc: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#fff'
    }
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.title}>
        <span ref={elRef}></span>
      </h2>
      <p style={styles.subtitle}>
        Discover the features that make FloatNote your perfect note-taking companion.
      </p>
      <div style={styles.grid}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.5)';
            }}
          >
            <span style={styles.emoji}>{feature.emoji}</span>
            <h3 style={styles.cardTitle}>{feature.title}</h3>
            <p style={styles.cardDesc}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
