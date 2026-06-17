import React, { useState, useEffect } from 'react';

const compliments = [
  { id: 1, text: "You have the kindest, most beautiful soul I have ever known.", left: 15, size: 40, speed: 18, delay: 0 },
  { id: 2, text: "The sound of your voice is my absolute favorite sound in the world.", left: 45, size: 45, speed: 22, delay: 2 },
  { id: 3, text: "Your intelligence and wit inspire me to be a better person every single day.", left: 75, size: 38, speed: 15, delay: 4 },
  { id: 4, text: "You have a magical way of making everyone around you feel warm and loved.", left: 30, size: 50, speed: 25, delay: 1 },
  { id: 5, text: "I admire your strength, your grace, and your infinite capacity for empathy.", left: 60, size: 42, speed: 19, delay: 5 },
  { id: 6, text: "You make ordinary moments feel extraordinary just by being there.", left: 85, size: 48, speed: 21, delay: 3 },
  { id: 7, text: "Every single day, I find new reasons to fall in love with you all over again.", left: 20, size: 44, speed: 17, delay: 6 },
  { id: 8, text: "You are my home, my anchor, and my greatest source of peace.", left: 50, size: 52, speed: 24, delay: 7 },
  { id: 9, text: "Your passion and drive are absolutely mesmerizing to watch.", left: 70, size: 36, speed: 16, delay: 8 },
  { id: 10, text: "The warmth in your eyes makes me feel safe, no matter what happens.", left: 10, size: 46, speed: 20, delay: 9 },
  { id: 11, text: "You have a laugh that can make the sun shine on the cloudiest days.", left: 38, size: 42, speed: 18, delay: 11 },
  { id: 12, text: "Your creativity and perspective open my mind to new wonders.", left: 68, size: 48, speed: 23, delay: 10 }
];

export default function HeartUniverse({ triggerSparkles }) {
  const [selectedCompliment, setSelectedCompliment] = useState(null);
  const [heartElements, setHeartElements] = useState([]);
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
    setHeartElements(compliments.map(c => ({
      ...c,
      drift: -15 + Math.random() * 30,
    })));
  }, []);

  const handleHeartClick = (heart, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    if (triggerSparkles) {
      triggerSparkles(x, y, '#ff5e97');
      setTimeout(() => triggerSparkles(x, y, '#ffffff'), 150);
    }
    
    setSelectedCompliment(heart);
  };

  return (
    <section
      className="heart-universe-section"
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: '80px 15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <div className="container text-center" style={{ zIndex: 12 }}>
        <h2 
          className="font-luxury-title"
          style={{
            fontSize: 'var(--fs-section-title)',
            marginBottom: '10px',
            textShadow: '0 0 15px rgba(255, 94, 151, 0.4)',
          }}
        >
          Floating Heart Universe
        </h2>
        <p 
          className="font-romantic-subtitle"
          style={{
            fontSize: 'var(--fs-body)',
            maxWidth: '500px',
            margin: '0 auto 20px',
          }}
        >
          Glowing particle hearts rising through gravity. Tap a heart to unlock a hidden compliment.
        </p>
      </div>

      {/* Floating Hearts Area */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '68vh' : '62vh',
          maxWidth: '1000px',
          margin: '0 auto',
          zIndex: 8,
        }}
      >
        {heartElements.map((heart) => {
          const finalSize = isMobile ? heart.size * 0.82 : heart.size;
          
          return (
            <button
              key={heart.id}
              onClick={(e) => handleHeartClick(heart, e)}
              style={{
                position: 'absolute',
                bottom: '-12%',
                left: `${heart.left}%`,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                padding: 0,
                zIndex: 10,
                animation: `heart-rise ${heart.speed}s linear infinite, heart-sway 4s ease-in-out infinite alternate`,
                animationDelay: `${heart.delay}s`,
                minWidth: '40px',
                minHeight: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                  width: `${finalSize}px`,
                  height: `${finalSize}px`,
                  color: 'rgba(255, 94, 151, 0.85)',
                  filter: 'drop-shadow(0 0 8px rgba(255, 94, 151, 0.7))',
                  animation: 'pulse-star 2.5s infinite ease-in-out',
                  animationDelay: `${heart.id * 0.3}s`,
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.22)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* Compliment Reveal Modal */}
      {selectedCompliment && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(5, 2, 12, 0.75)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '15px',
          }}
          onClick={() => setSelectedCompliment(null)}
        >
          <div
            className="glass-card"
            style={{
              padding: 'clamp(30px, 6vw, 45px) clamp(20px, 4vw, 30px)',
              textAlign: 'center',
              position: 'relative',
              border: '1px solid rgba(255, 94, 151, 0.35)',
              boxShadow: '0 25px 75px rgba(0,0,0,0.95), 0 0 50px rgba(255, 94, 151, 0.25)',
              animation: 'float 6s ease-in-out infinite alternate',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 94, 151, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 15px',
                border: '1px solid rgba(255, 94, 151, 0.25)',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{
                  width: '25px',
                  height: '25px',
                  color: 'var(--color-romantic-pink)',
                  filter: 'drop-shadow(0 0 6px rgba(255, 94, 151, 0.6))',
                }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <h3
              className="font-luxury-title"
              style={{
                fontSize: 'clamp(1.1rem, 3.5vw, 1.25rem)',
                color: '#fff',
                marginBottom: '10px',
                letterSpacing: '0.08em',
              }}
            >
              Compliment Revealed
            </h3>

            <p
              style={{
                fontSize: 'var(--fs-body)',
                lineHeight: '1.7',
                color: 'var(--text-secondary)',
                marginBottom: '25px',
                fontWeight: 300,
                fontStyle: 'italic',
              }}
            >
              "{selectedCompliment.text}"
            </p>

            <button
              onClick={() => setSelectedCompliment(null)}
              className="cta-button"
              style={{
                padding: '8px 20px',
                fontSize: '0.78rem',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 94, 151, 0.2))',
                borderColor: 'rgba(255, 94, 151, 0.4)',
                boxShadow: 'none',
                minHeight: '40px',
              }}
            >
              Keep Floating
            </button>

            {/* Corner decorations */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', width: '8px', height: '8px', borderTop: '2px solid var(--color-romantic-pink)', borderLeft: '2px solid var(--color-romantic-pink)' }} />
            <div style={{ position: 'absolute', top: '15px', right: '15px', width: '8px', height: '8px', borderTop: '2px solid var(--color-romantic-pink)', borderRight: '2px solid var(--color-romantic-pink)' }} />
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-romantic-pink)', borderLeft: '2px solid var(--color-romantic-pink)' }} />
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-romantic-pink)', borderRight: '2px solid var(--color-romantic-pink)' }} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes heart-rise {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-80vh);
            opacity: 0;
          }
        }
        @keyframes heart-sway {
          0% {
            margin-left: 0;
          }
          100% {
            margin-left: 30px;
          }
        }
      `}</style>
    </section>
  );
}
