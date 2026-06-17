import React, { useState, useEffect } from 'react';

export default function MoonOfMemories({ name = "Sophia", triggerSparkles }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [typedLines, setTypedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const letterLines = [
    `Dearest ${name},`,
    "",
    "From the moment you entered my life, you have filled it with",
    "light, warmth, and a love deeper than the cosmos.",
    "",
    "Among the billions of stars in the sky, you are the one that",
    "guides me, the one that inspires me, and the one that makes",
    "every ordinary day feel like a magical adventure.",
    "",
    "Thank you for your warmth, your laughter, and for being",
    "the most beautiful chapter of my life.",
    "",
    "On this special day, I wish you all the joy and happiness",
    "in the universe.",
    "",
    "Happy Birthday, ${name}!",
    "",
    "Yours forever,",
    "❤️"
  ];

  const handleMoonClick = (e) => {
    if (isAnimating) return;
    
    // Trigger sparkles
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    if (triggerSparkles) {
      triggerSparkles(x, y, '#e2b85c');
      setTimeout(() => triggerSparkles(x, y, '#ffffff'), 200);
    }

    setIsAnimating(true);
    setIsOpen(true);
    
    // Reset typing state
    setTypedLines([]);
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1200);
  };

  const handleClose = () => {
    setIsAnimating(true);
    setIsOpen(false);
    setTimeout(() => {
      setIsAnimating(false);
      setTypedLines([]);
    }, 1000);
  };

  // Typing Effect Loop
  useEffect(() => {
    if (!isOpen || isAnimating) return;

    if (currentLineIndex < letterLines.length) {
      const currentFullLine = letterLines[currentLineIndex];
      
      if (currentFullLine === "") {
        // empty line, skip quickly
        setTypedLines(prev => [...prev, ""]);
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      } else if (currentCharIndex < currentFullLine.length) {
        const timer = setTimeout(() => {
          setTypedLines(prev => {
            const copy = [...prev];
            if (copy[currentLineIndex] === undefined) {
              copy[currentLineIndex] = "";
            }
            copy[currentLineIndex] += currentFullLine[currentCharIndex];
            return copy;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, 25); // typing speed
        return () => clearTimeout(timer);
      } else {
        // move to next line
        const timer = setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 300); // delay between lines
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, isAnimating, currentLineIndex, currentCharIndex]);

  return (
    <section
      className="moon-memories-section"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <div 
        className="container text-center" 
        style={{ 
          marginBottom: '50px',
          opacity: isOpen ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      >
        <h2 
          className="font-luxury-title"
          style={{
            fontSize: '2rem',
            marginBottom: '10px',
            textShadow: '0 0 15px rgba(226, 184, 92, 0.3)',
          }}
        >
          Moon Of Memories
        </h2>
        <p 
          className="font-romantic-subtitle"
          style={{
            fontSize: '0.95rem',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          A golden celestial beacon holding an intimate message. Click the moon to open the portal.
        </p>
      </div>

      {/* Giant Glowing Moon Element */}
      <div
        onClick={handleMoonClick}
        style={{
          position: 'relative',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 15,
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isOpen 
            ? 'scale(10) rotate(90deg)' // expands like a portal
            : 'scale(1)',
          opacity: isOpen ? 0 : 1,
          animation: isOpen ? 'none' : 'float-slower 7s ease-in-out infinite alternate',
        }}
      >
        {/* Moon Body with radial crater styling */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #fffdd0 0%, #f3e5ab 30%, #e2b85c 70%, #8c6214 100%)',
            boxShadow: '0 0 50px rgba(226, 184, 92, 0.6), inset -15px -15px 40px rgba(0,0,0,0.5), inset 10px 10px 30px rgba(255,255,255,0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Crater overlays */}
          <div style={{ position: 'absolute', top: '25%', left: '20%', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.06)', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.1)' }} />
          <div style={{ position: 'absolute', top: '55%', left: '15%', width: '60px', height: '55px', borderRadius: '50%', background: 'rgba(0,0,0,0.08)', boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.15)' }} />
          <div style={{ position: 'absolute', top: '40%', right: '20%', width: '35px', height: '35px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)', boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '35%', width: '45px', height: '40px', borderRadius: '50%', background: 'rgba(0,0,0,0.07)', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.1)' }} />
          
          {/* Fine detailed craters */}
          <div style={{ position: 'absolute', top: '15%', right: '40%', width: '15px', height: '15px', borderRadius: '50%', background: 'rgba(0,0,0,0.04)' }} />
          <div style={{ position: 'absolute', bottom: '45%', left: '45%', width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(0,0,0,0.05)' }} />
        </div>

        {/* Ambient Ring Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            right: '-10px',
            bottom: '-10px',
            borderRadius: '50%',
            border: '2px solid rgba(226, 184, 92, 0.3)',
            animation: 'pulse-ring 3s infinite',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Love Letter Portal Overlay */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(5, 2, 12, 0.9)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            opacity: isAnimating ? 0 : 1,
            transition: 'opacity 0.8s ease',
          }}
        >
          {/* Folded / Unfolding Letter container */}
          <div
            className="glass-card"
            style={{
              maxWidth: '650px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '40px 50px',
              border: '1px solid rgba(226, 184, 92, 0.3)',
              boxShadow: '0 25px 80px rgba(0,0,0,0.9), 0 0 50px rgba(226, 184, 92, 0.2)',
              position: 'relative',
              animation: 'letter-unfold 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              transformOrigin: 'center center',
            }}
          >
            {/* Calligraphy writing sheet */}
            <div
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: '1.95rem',
                lineHeight: '1.55',
                color: 'var(--color-gold)',
                minHeight: '400px',
                textAlign: 'left',
                paddingRight: '10px',
              }}
            >
              {typedLines.map((line, idx) => (
                <div key={idx} style={{ minHeight: line === "" ? "1.5rem" : "auto" }}>
                  {line}
                  {idx === typedLines.length - 1 && currentLineIndex < letterLines.length && (
                    <span 
                      style={{ 
                        display: 'inline-block',
                        width: '2px', 
                        height: '1.7rem', 
                        backgroundColor: 'var(--color-gold)',
                        marginLeft: '3px',
                        animation: 'audio-pulse 0.8s infinite alternate',
                        verticalAlign: 'middle'
                      }} 
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Letter controls */}
            <div 
              style={{ 
                marginTop: '30px', 
                textAlign: 'center',
                opacity: currentLineIndex >= letterLines.length ? 1 : 0.4,
                transition: 'opacity 0.5s ease',
              }}
            >
              <button
                onClick={handleClose}
                className="cta-button"
                style={{
                  background: 'linear-gradient(135deg, rgba(226, 184, 92, 0.2), rgba(10, 5, 20, 0.6))',
                  borderColor: 'rgba(226, 184, 92, 0.5)',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.4), 0 0 10px rgba(226, 184, 92, 0.2)',
                  fontSize: '0.85rem',
                  padding: '12px 30px',
                }}
              >
                Seal & Close Letter
              </button>
            </div>

            {/* Decorative Gold Corner Borders */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', width: '15px', height: '15px', borderTop: '2px solid var(--color-gold)', borderLeft: '2px solid var(--color-gold)' }} />
            <div style={{ position: 'absolute', top: '20px', right: '20px', width: '15px', height: '15px', borderTop: '2px solid var(--color-gold)', borderRight: '2px solid var(--color-gold)' }} />
            <div style={{ position: 'absolute', bottom: '20px', left: '20px', width: '15px', height: '15px', borderBottom: '2px solid var(--color-gold)', borderLeft: '2px solid var(--color-gold)' }} />
            <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '15px', height: '15px', borderBottom: '2px solid var(--color-gold)', borderRight: '2px solid var(--color-gold)' }} />
          </div>
        </div>
      )}

      {/* CSS Unfold Animation Inject */}
      <style>{`
        @keyframes letter-unfold {
          0% {
            transform: scaleY(0.01) scaleX(0.8);
            opacity: 0;
            background-color: rgba(226, 184, 92, 0.1);
          }
          50% {
            transform: scaleY(0.01) scaleX(1);
            opacity: 0.5;
            background-color: rgba(10, 5, 20, 0.6);
          }
          100% {
            transform: scaleY(1) scaleX(1);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
