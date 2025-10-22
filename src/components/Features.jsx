function Features() {
  return (
    <section style={{ padding: '80px 16px' }}>
      <div style={{ maxWidth: '1152px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '48px' }}>Why Fnote?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <div style={{ backgroundColor: '#374151', padding: '24px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Private & Local-First</h3>
            <p style={{ margin: 0 }}>Your notes stay on your device. No accounts, no cloud, just instant access.</p>
          </div>
          <div style={{ backgroundColor: '#374151', padding: '24px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Zero Friction</h3>
            <p style={{ margin: 0 }}>Always on top, translucent, and ready when you need it. Capture ideas instantly.</p>
          </div>
          <div style={{ backgroundColor: '#374151', padding: '24px', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Customizable</h3>
            <p style={{ margin: 0 }}>Change colors, opacity, fonts, and resize to fit your workflow.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
