import React, { useRef, useEffect } from "react";
import Particles from "./Particles";
import FloatingWindows from "./components/FloatingWindows";
import FeaturesSection from "./components/FeaturesSection";
import Navbar from "./components/Navbar";

// use public assets path for logo (public/assets/logo.png)
const logo = "/assets/logo.png";

function LaserFlowBoxExample() {
  const revealImgRef = useRef(null);
  const heroRef = useRef(null);
  const laserColor = "#ffffff";

  useEffect(() => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      console.log("Hero box position: x=", rect.left, "y=", rect.top);
    }
  }, []);

  // Global mousemove handler so reveal effect follows cursor even when overlay has pointer-events:none
  useEffect(() => {
    const handler = (e) => {
      const el = revealImgRef.current;
      if (!el) return;
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <div>
      <Navbar logo={logo} repoUrl="https://github.com/winshaurya/floatnote" />

      {/* Fixed background particles */}
      <Particles
        particleColors={[laserColor]}
        particleCount={300}
        particleSpread={12}
        speed={0.12}
        particleBaseSize={80}
        moveParticlesOnHover={true}
        alphaParticles={false}
        className="app-particles"
        style={{ position: "fixed", inset: 0, zIndex: 10, pointerEvents: "none" }}
      />

      {/* Main content container */}
      <div
        style={{
          width: "100%",
          paddingTop: "18vh",
          backgroundColor: "transparent",
          zIndex: 30
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty("--mx", `${x}px`);
            el.style.setProperty("--my", `${y + rect.height * 0.5}px`);
          }
        }}
        onMouseLeave={() => {
          const el = revealImgRef.current;
          if (el) {
            el.style.setProperty("--mx", "-9999px");
            el.style.setProperty("--my", "-9999px");
          }
        }}
      >
        {/* Hero box */}
        <div
          ref={heroRef}
          id="heroBOx"
          aria-label="heroBOx"
          style={{
            position: "relative",
            margin: "0 auto",
            marginBottom: "1rem",
            width: "calc(100% - 64px)",
            maxWidth: "1200px",
            aspectRatio: "16 / 9",
            backgroundImage:
              "url(https://www.wallpaperhub.app/_next/image?url=https%3A%2F%2Fcdn.wallpaperhub.app%2Fcloudcache%2Fb%2Fd%2F7%2F6%2F4%2Fb%2Fbd764bb25d49a05105060185774ba14cd2c846f7.jpg&w=4500&q=100)",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            borderRadius: "20px",
            border: `3px solid ${laserColor}`,
            boxShadow: `0 20px 40px rgba(0,0,0,0.45), 0 0 30px ${laserColor}44`,
            padding: "20px",
            color: "#e6e6e8",
            fontSize: "1.5rem",
            zIndex: 30,
            pointerEvents: "auto",
            boxSizing: "border-box",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start"
          }}
        >
          <FloatingWindows count={1} />

          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <style>{`
              .download-cta{
                transition: transform .18s cubic-bezier(.2,.9,.2,1), box-shadow .18s cubic-bezier(.2,.9,.2,1);
                z-index:1000;
                will-change: transform, box-shadow;
                transform: translate(-50%,-50%) scale(1);
              }
              .download-cta:hover{
                transform: translate(-50%,-50%) scale(1.08);
                box-shadow: 0 18px 34px rgba(0,0,0,0.26);
              }
              .download-cta:active{
                transform: translate(-50%,-50%) scale(0.98);
                box-shadow: 0 6px 12px rgba(0,0,0,0.12);
              }
              .download-cta:focus-visible{outline:3px solid rgba(11,107,45,0.12); outline-offset:3px;}
              @media (prefers-reduced-motion: reduce) {
                .download-cta, .download-cta:hover, .download-cta:active { transition: none !important; transform: translate(-50%,-50%) !important; }
              }
            `}</style>

            <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', maxWidth: '90%', pointerEvents: 'none' }}>
              <h1 style={{ margin: 0, color: '#ffffff', fontSize: 'clamp(36px, 6vw, 96px)', lineHeight: 1, fontWeight: 900 }}>Fnote</h1>
              <div style={{ marginTop: 8, color: '#0b6b2d', fontSize: 'clamp(12px, 1.6vw, 18px)', letterSpacing: '0.02em', fontWeight: 700 }}>Sticky Notes for your Screen</div>
            </div>

            <a
              href="https://github.com/winshaurya/floatnote/releases/download/launched/FloatNote.exe"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Fnote for Windows"
              className="download-cta"
              style={{
                zIndex: 1000,
                position: 'absolute',
                top: '70%',
                left: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff',
                color: '#0b6b2d',
                textDecoration: 'none',
                padding: 'clamp(10px, 1.6vw, 14px) clamp(14px, 2.6vw, 24px)',
                borderRadius: 12,
                minWidth: 160,
                boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                fontWeight: 800,
                fontSize: 'clamp(14px, 1.6vw, 18px)',
                cursor: 'pointer',
                border: '2px solid rgba(11,107,45,0.08)',
                pointerEvents: 'auto'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                <path d="M12 3v10" stroke="#0b6b2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 10l5 5 5-5" stroke="#0b6b2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21H3" stroke="#0b6b2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ marginLeft: 10, color: '#0b6b2d' }}>Download for Windows</span>
            </a>
          </div>
        </div>

        {/* Features section */}
        <div style={{ width: "100%", marginTop: "1rem" }}>
          <FeaturesSection />
        </div>
      </div>
    </div>
  );
}

function App() {
  return <LaserFlowBoxExample />;
}

export default App;
