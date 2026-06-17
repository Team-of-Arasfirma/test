import React, { useEffect, useRef, useState } from 'react';

const chapters = [
  {
    id: 1,
    title: "The Day We Met",
    subtitle: "A cosmic alignment of paths",
    text: "Among a sea of strangers, our paths crossed. A simple glance, a warm greeting, and in that fleeting moment, the universe shifted. I didn't know it yet, but my life had just found its true center.",
    x: 25, // percentage x coordinate (staggered for mobile safety)
    y: 20, // percentage y coordinate
  },
  {
    id: 2,
    title: "The First Smile",
    subtitle: "The light that guided me home",
    text: "Your smile has its own gravity. The moment your eyes lit up and that beautiful smile spread across your face, every worry vanished. It became the highlight of my days and the comfort of my nights.",
    x: 75,
    y: 42,
  },
  {
    id: 3,
    title: "The Moment Everything Changed",
    subtitle: "When two hearts found one rhythm",
    text: "There comes a time when you realize you never want to spend another day without someone. For me, that moment was when I realized your laughter was my favorite sound, and your happiness was my ultimate goal.",
    x: 25,
    y: 65,
  },
  {
    id: 4,
    title: "The Beginning Of Our Story",
    subtitle: "Writing our own constellation in the stars",
    text: "Here we are, writing our own cosmic tale. Every conversation, every shared quiet, every adventure, and every milestone is a thread in the beautiful constellation of us. And the best chapters are yet to come.",
    x: 75,
    y: 85,
  }
];

export default function ConstellationStory() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const totalScrollable = rect.height - viewportHeight;
      const currentScroll = -rect.top;
      
      const progress = Math.min(1, Math.max(0, currentScroll / totalScrollable));
      setScrollProgress(progress);

      if (progress < 0.15) {
        setActiveChapter(1);
      } else if (progress >= 0.15 && progress < 0.45) {
        setActiveChapter(2);
      } else if (progress >= 0.45 && progress < 0.75) {
        setActiveChapter(3);
      } else {
        setActiveChapter(4);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const getSvgPath = () => {
    if (chapters.length < 2) return "";
    let path = `M ${isMobile ? 30 : chapters[0].x}% ${chapters[0].y}%`;
    for (let i = 1; i < chapters.length; i++) {
      const p1 = chapters[i - 1];
      const p2 = chapters[i];
      const x1 = isMobile ? (i % 2 === 1 ? 30 : 70) : p1.x;
      const x2 = isMobile ? (i % 2 === 0 ? 30 : 70) : p2.x;
      const cpX1 = x1 + (x2 - x1) * 0.5;
      const cpY1 = p1.y;
      const cpX2 = x1 + (x2 - x1) * 0.5;
      const cpY2 = p2.y;
      path += ` C ${cpX1}% ${cpY1}%, ${cpX2}% ${cpY2}%, ${x2}% ${p2.y}%`;
    }
    return path;
  };

  return (
    <div 
      ref={containerRef} 
      className="constellation-container"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '260vh', // robust scrolling timeline height
        zIndex: 5,
      }}
    >
      <div 
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {/* SVG Drawing Constellation Lines */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <path
            d={getSvgPath()}
            fill="none"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="2"
            strokeDasharray="4 8"
          />

          <path
            d={getSvgPath()}
            fill="none"
            stroke="url(#lineGradMobile)"
            strokeWidth="3.5"
            style={{
              strokeDasharray: '1000',
              strokeDashoffset: 1000 - (scrollProgress * 1000),
              transition: 'stroke-dashoffset 0.1s linear',
              filter: 'drop-shadow(0 0 8px rgba(255, 94, 151, 0.6))',
            }}
          />

          <defs>
            <linearGradient id="lineGradMobile" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-cyan-nebula)" />
              <stop offset="50%" stopColor="var(--color-cosmic-purple)" />
              <stop offset="100%" stopColor="var(--color-romantic-pink)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Stars */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, zIndex: 2 }}>
          {chapters.map((chapter, index) => {
            const isActive = activeChapter === chapter.id;
            const isPassed = activeChapter > chapter.id || scrollProgress > (chapter.id - 1.25) / 4;
            const xPos = isMobile ? (index % 2 === 0 ? 30 : 70) : chapter.x;

            return (
              <div
                key={chapter.id}
                style={{
                  position: 'absolute',
                  left: `${xPos}%`,
                  top: `${chapter.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  className="constellation-star"
                  style={{
                    width: isActive ? '16px' : '9px',
                    height: isActive ? '16px' : '9px',
                    backgroundColor: isActive ? '#fff' : isPassed ? 'var(--color-romantic-pink)' : 'rgba(255, 255, 255, 0.4)',
                    borderRadius: '50%',
                    boxShadow: isActive 
                      ? '0 0 20px #fff, 0 0 10px var(--color-romantic-pink), 0 0 30px var(--color-cyan-nebula)'
                      : isPassed
                      ? '0 0 10px var(--color-romantic-pink)'
                      : 'none',
                    transition: 'all 0.5s ease',
                  }}
                />

                {isActive && (
                  <>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px', border: '1px solid rgba(0, 229, 255, 0.5)', borderRadius: '50%', animation: 'pulse-ring 2s infinite', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50px', height: '50px', border: '1px solid rgba(255, 94, 151, 0.3)', borderRadius: '50%', animation: 'pulse-ring 2s infinite 0.6s', pointerEvents: 'none' }} />
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Story Card */}
        <div
          style={{
            position: 'absolute',
            bottom: '7%',
            maxWidth: '550px',
            width: '94%',
            padding: '0 10px',
            zIndex: 10,
          }}
        >
          {chapters.map((chapter) => {
            const isActive = activeChapter === chapter.id;
            return (
              <div
                key={chapter.id}
                className="glass-card"
                style={{
                  position: isActive ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  opacity: isActive ? 1 : 0,
                  visibility: isActive ? 'visible' : 'hidden',
                  transform: isActive ? 'translateY(0) scale(1)' : 'translateY(25px) scale(0.96)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  padding: 'clamp(20px, 4vw, 30px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: '700', color: 'var(--color-gold)', opacity: 0.8 }}>
                    0{chapter.id}
                  </div>
                  <div>
                    <h3 className="font-luxury-title" style={{ fontSize: 'var(--fs-card-title)', margin: 0, letterSpacing: '0.08em', color: '#fff' }}>
                      {chapter.title}
                    </h3>
                    <p style={{ fontSize: '0.72rem', margin: '2px 0 0', color: 'var(--color-romantic-pink)', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: '500' }}>
                      {chapter.subtitle}
                    </p>
                  </div>
                </div>

                <div style={{ width: '50px', height: '1.5px', background: 'linear-gradient(90deg, var(--color-gold), transparent)' }} />

                <p style={{ fontSize: 'var(--fs-body)', lineHeight: '1.65', color: 'var(--text-secondary)', margin: 0 }}>
                  {chapter.text}
                </p>
              </div>
            );
          })}
        </div>

        {/* Scroll Helper */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            color: 'var(--text-muted)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            opacity: scrollProgress > 0.9 ? 0 : 0.6,
            transition: 'opacity 0.5s ease',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
          Scroll to explore the chapters
        </div>
      </div>
    </div>
  );
}
