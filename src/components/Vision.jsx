import { motion } from 'framer-motion';

function Vision() {
  return (
    <motion.section style={{ padding: '80px 16px', backgroundColor: '#111827' }} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}}>
      <div style={{ maxWidth: '1152px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '32px' }}>Our Vision</h2>
        <p style={{ fontSize: '1.25rem', marginBottom: '32px' }}>Fnote is more than notes — it's a platform for tiny, delightful widgets. From clocks to timers, build your perfect desktop overlay.</p>
  <button style={{ backgroundColor: '#ec4899', color: '#e6e6e8', padding: '12px 32px', borderRadius: '8px', fontWeight: '600', border: 'none', cursor: 'pointer' }}>Explore Widgets</button>
      </div>
    </motion.section>
  );
}

export default Vision;
