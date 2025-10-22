import React, { useRef, useEffect } from "react";
import Particles from "./Particles";
import FloatingWindows from "./components/FloatingWindows";
import FeaturesSection from "./components/FeaturesSection";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

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
    // Laser removed: no laserRef to log
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

  // Laser removed: no alignment or resize observers needed

  return (
      <div>
        {/* CardNav component removed as part of cleanup */}

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

      {/* Main content container: padding-top keeps space under the fixed navbar */}
      <div
        style={{
          width: "100%",
          paddingTop: "18vh", // keep ~18% gap from top to hero on first load
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
        {/* LaserFlow removed from landing page */}

        {/* Hero box — now in normal flow (not absolute) so sections stack naturally */}
        <div
          ref={heroRef}
          id="heroBOx"
          aria-label="heroBOx"
          style={{
            position: "relative",
            // keep a small margin from the top (navbar accounted for by container padding)
            margin: "0 auto",
            marginBottom: "1rem", // reduce gap to the features section
            marginLeft: "auto",
            marginRight: "6%",
            width: "70%",
            maxWidth: "1000px",
            aspectRatio: "16 / 9",
            // simplified background so the new left content is clearly visible
            backgroundColor: 'rgba(0,0,0,0.18)',
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
          <Hero />
          <FloatingWindows count={1} />
        </div>

        {/* Features section — now in normal flow below the hero */}
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
 