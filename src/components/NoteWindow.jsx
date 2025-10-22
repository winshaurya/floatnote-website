import React, { useEffect, useRef, useState } from 'react';

/**
 * NoteWindow - React component implementing the provided note UI.
 * Uses localStorage fallback; if `window.api.invoke` exists it will call that.
 *
 * This component uses inline styles so no extra CSS file is required.
 */

export default function NoteWindow({ noteIdProp }) {
  const editorRef = useRef(null);
  const [noteId] = useState(noteIdProp || `local-note`);
  const [savedAt, setSavedAt] = useState(null);
  const [pinned, setPinned] = useState(false);
  const [accent, setAccent] = useState('#ffcc00');

  // inline styles (kept concise, reflect the original UI)
  const styles = {
    root: {
      '--accent': accent,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      borderRadius: 12,
      color: '#efefef',
      fontFamily:
        "Inter, Segoe UI, Roboto, system-ui, -apple-system, 'Helvetica Neue', Arial",
      background:
        'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(0,0,0,0.04))',
      padding: 8,
      boxSizing: 'border-box',
    },
    titlebar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 8px',
      borderRadius: 10,
      userSelect: 'none',
    },
    dragArea: { flex: 1, display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 6 },
    title: { fontWeight: 600, color: 'rgba(255,255,255,0.7)', fontSize: 14 },
    controls: { display: 'flex', gap: 6, alignItems: 'center' },
    btn: {
      background: 'transparent',
      border: '0',
      color: 'rgba(255,255,255,0.7)',
      cursor: 'pointer',
      padding: 6,
      borderRadius: 6,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    content: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 10,
      padding: 10,
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.12)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.45)',
      backdropFilter: 'blur(12px) saturate(140%)',
      overflow: 'hidden',
    },
    editor: {
      outline: 'none',
      color: 'var(--text, #efefef)',
      fontSize: 14,
      lineHeight: 1.45,
      padding: 6,
      overflow: 'auto',
      height: '100%',
      whiteSpace: 'pre-wrap',
      background: 'transparent',
    },
    footer: { display: 'flex', justifyContent: 'flex-end', padding: '6px 8px', color: 'rgba(255,255,255,0.7)', fontSize: 12 },
    colorPicker: {
      width: 34,
      height: 34,
      padding: 0,
      borderRadius: 6,
      border: '1px solid rgba(255,255,255,0.06)',
      background: 'transparent',
      cursor: 'pointer',
    },
  };

  // load initial content and color
  useEffect(() => {
    const saved = localStorage.getItem(`note:${noteId}`) || '';
    if (editorRef.current) {
      editorRef.current.innerText = saved;
    }
    const savedColor = localStorage.getItem(`note:${noteId}:color`) || '#ffcc00';
    setAccent(savedColor);
    document.documentElement.style.setProperty('--accent', savedColor);
    const savedTs = localStorage.getItem(`note:${noteId}:savedAt`);
    setSavedAt(savedTs ? Number(savedTs) : null);
  }, [noteId]);

  function setSavedLabel(ts) {
    if (!ts) return 'never';
    return new Date(ts).toLocaleString();
  }

  async function saveNote() {
    const content = editorRef.current ? editorRef.current.innerText : '';
    const color = accent;
    const payload = { id: noteId, content, color, updatedAt: Date.now() };

    if (window.api && typeof window.api.invoke === 'function') {
      try {
        await window.api.invoke('save-note', payload);
      } catch (err) {
        // fallback to localStorage
        localFallback();
      }
    } else {
      localFallback();
    }

    function localFallback() {
      localStorage.setItem(`note:${noteId}`, content);
      localStorage.setItem(`note:${noteId}:color`, color);
      localStorage.setItem(`note:${noteId}:savedAt`, Date.now());
      setSavedAt(Date.now());
    }

    // visual micro-feedback: briefly replace Save icon with check
    const saveBtn = document.getElementById(`note-save-btn-${noteId}`);
    if (saveBtn) {
      const prev = saveBtn.textContent;
      saveBtn.textContent = '✓';
      setTimeout(() => {
        saveBtn.textContent = prev || '💾';
      }, 700);
    }
  }

  // keyboard shortcuts
  useEffect(() => {
    const handler = (ev) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      if ((isMac ? ev.metaKey : ev.ctrlKey) && ev.key.toLowerCase() === 's') {
        ev.preventDefault();
        saveNote();
      }
      if (ev.key === 'Escape') {
        if (window.api && window.api.invoke) window.api.invoke('close-note', { id: noteId });
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [noteId, accent]);

  // autosave on blur
  useEffect(() => {
    const ed = editorRef.current;
    if (!ed) return;
    const onBlur = () => saveNote();
    ed.addEventListener('blur', onBlur);
    return () => ed.removeEventListener('blur', onBlur);
  }, []);

  const onColorChange = (e) => {
    const c = e.target.value;
    setAccent(c);
    document.documentElement.style.setProperty('--accent', c);
    localStorage.setItem(`note:${noteId}:color`, c);
  };

  const togglePin = () => {
    const next = !pinned;
    setPinned(next);
    const btn = document.getElementById(`note-pin-btn-${noteId}`);
    if (btn) btn.style.opacity = next ? '1' : '0.7';
    if (window.api && window.api.invoke) window.api.invoke('toggle-pin', { id: noteId, pin: next });
  };

  return (
    <div style={styles.root} aria-label="note-window">
      <header style={styles.titlebar} className="titlebar">
        <div style={styles.dragArea} className="drag-area">
          <div style={styles.title} className="title">Note</div>
        </div>
        <div style={styles.controls} className="controls">
          <button id={`note-pin-btn-${noteId}`} style={styles.btn} className="btn icon btn-pin" title="Pin" onClick={togglePin}>📌</button>
          <input style={styles.colorPicker} className="color-picker" type="color" title="Accent color" aria-label="Accent color" value={accent} onChange={onColorChange} />
          <button id={`note-save-btn-${noteId}`} style={styles.btn} className="btn icon btn-save" title="Save (Ctrl/Cmd+S)" onClick={saveNote}>💾</button>
          <button style={styles.btn} className="btn icon btn-close" title="Close" onClick={() => { if (window.api && window.api.invoke) window.api.invoke('close-note', { id: noteId }); else window.close(); }}>✕</button>
        </div>
      </header>

      <main style={styles.content} className="content">
        <div
          id="editor"
          ref={editorRef}
          contentEditable
          spellCheck
          aria-label="Note editor"
          style={styles.editor}
        />
      </main>

      <footer style={styles.footer} className="footer">
        <div className="meta">Saved: <span id={`savedAt-${noteId}`}>{setSavedLabel(savedAt)}</span></div>
      </footer>
    </div>
  );
}
