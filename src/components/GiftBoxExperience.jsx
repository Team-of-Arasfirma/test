import React, { useState, useEffect } from 'react';

export default function GiftBoxExperience({ triggerSparkles }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', checkMobile);
    checkMobile();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOpenGift = (e) => {
    if (isOpen || isOpening) return;

    setIsOpening(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (triggerSparkles) {
      triggerSparkles(x, y, '#e2b85c');
      setTimeout(() => triggerSparkles(x, y - 30, '#ffd166'), 150);
      setTimeout(() => triggerSparkles(x - 40, y, '#ffffff'), 300);
      setTimeout(() => triggerSparkles(x + 40, y, '#ffffff'), 300);
    }

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
    }, 1100);
  };

  return (
    <section
      className="gift-box-section"
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: '80px 15px',
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
          marginBottom: isMobile ? '30px' : '50px',
          opacity: isOpen ? 0.3 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        <h2 
          className="font-luxury-title"
          style={{
            fontSize: 'var(--fs-section-title)',
            marginBottom: '10px',
            textShadow: '0 0 15px rgba(226, 184, 92, 0.3)',
          }}
        >
          Premium Gift Box
        </h2>
        <p 
          className="font-romantic-subtitle"
          style={{
            fontSize: 'var(--fs-body)',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          An anti-gravity treasure containing the ultimate expression. Tap the box to untie the ribbon.
        </p>
      </div>

      {/* 3D Scene Wrapper */}
      <div
        style={{
          width: '280px',
          height: '320px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 8,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(226, 184, 92, 0.15) 0%, transparent 70%)',
            filter: 'blur(10px)',
            opacity: isOpen ? 0.8 : 0.4,
            transition: 'opacity 1s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Gift Box with dynamic scale on mobile */}
        {!isOpen && (
          <div
            onClick={handleOpenGift}
            style={{
              position: 'relative',
              width: '160px',
              height: '160px',
              cursor: 'pointer',
              animation: isOpening ? 'none' : 'float 5s ease-in-out infinite alternate',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.5s ease',
              transform: isMobile ? 'scale(0.85)' : 'scale(1)',
            }}
          >
            {/* Lid */}
            <div
              style={{
                position: 'absolute',
                top: '-7px',
                left: '-4px',
                width: '168px',
                height: '36px',
                backgroundColor: '#8e44ad',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                zIndex: 5,
                transformOrigin: 'top center',
                animation: isOpening ? 'lid-fly 1.2s forwards' : 'none',
              }}
            >
              {/* Bow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 6,
                  animation: isOpening ? 'ribbon-untie 0.8s forwards' : 'none',
                }}
              >
                <svg width="38" height="22" viewBox="0 0 50 30" fill="none">
                  <path d="M25 15 C10 0, 5 25, 25 15 Z" fill="#e2b85c" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                  <path d="M25 15 C40 0, 45 25, 25 15 Z" fill="#e2b85c" stroke="rgba(0,0,0,0.15)" strokeWidth="1" />
                  <circle cx="25" cy="15" r="4.5" fill="#b8913b" />
                </svg>
              </div>

              <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '22px', height: '100%', backgroundColor: '#e2b85c', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
              <div style={{ position: 'absolute', left: '0', top: '10px', width: '100%', height: '12px', backgroundColor: '#e2b85c', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
            </div>

            {/* Box Body */}
            <div
              style={{
                position: 'absolute',
                top: '26px',
                left: '0',
                width: '160px',
                height: '134px',
                background: 'linear-gradient(135deg, #732d91, #3c1353)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0 0 5px 5px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.6), inset 0 8px 12px rgba(255,255,255,0.08)',
                zIndex: 3,
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '22px', height: '100%', backgroundColor: '#e2b85c', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
              <div style={{ position: 'absolute', left: '0', top: '50px', width: '100%', height: '16px', backgroundColor: '#e2b85c', boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        )}

        {/* Opened Gift Box & Message Reveal */}
        {isOpen && (
          <div
            className="glass-card"
            style={{
              padding: 'clamp(25px, 5vw, 40px) clamp(15px, 4vw, 25px)',
              textAlign: 'center',
              border: '1px solid rgba(226, 184, 92, 0.4)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.95), 0 0 60px rgba(226, 184, 92, 0.25)',
              position: 'relative',
              animation: 'letter-unfold 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards, float-faster 6s ease-in-out infinite alternate',
              width: '100%',
            }}
          >
            <div style={{ position: 'absolute', top: '15px', right: '15px', fontSize: '1.1rem', color: 'var(--color-gold)' }}>💝</div>

            <div
              className="ray-glow"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '110%',
                height: '110%',
                background: 'radial-gradient(circle, rgba(226, 184, 92, 0.15) 0%, transparent 60%)',
                zIndex: -1,
                pointerEvents: 'none',
                borderRadius: '50%',
              }}
            />

            <h3
              className="font-luxury-title"
              style={{
                fontSize: 'clamp(0.95rem, 3vw, 1.15rem)',
                color: 'var(--color-gold)',
                marginBottom: '12px',
                letterSpacing: '0.12em',
              }}
            >
              The Ultimate Treasure
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.2rem, 4vw, 1.45rem)',
                lineHeight: '1.55',
                fontWeight: '700',
                color: '#fff',
                marginBottom: '15px',
                textShadow: '0 0 10px rgba(255,255,255,0.25)',
              }}
            >
              "The Greatest Gift In My Life Is Having You, ."
            </p>

            <p
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                fontWeight: 300,
                maxWidth: '280px',
                margin: '0 auto 20px',
              }}
            >
              Everything else fades in comparison to the love, warmth, and beautiful moments we share together.
            </p>

            <button
              onClick={() => setIsOpen(false)}
              className="cta-button"
              style={{
                padding: '8px 20px',
                fontSize: '0.78rem',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(226, 184, 92, 0.15))',
                borderColor: 'rgba(226, 184, 92, 0.4)',
                boxShadow: 'none',
                minHeight: '40px',
              }}
            >
              Seal Gift
            </button>

            {/* Corner decorations */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', width: '8px', height: '8px', borderTop: '2px solid var(--color-gold)', borderLeft: '2px solid var(--color-gold)' }} />
            <div style={{ position: 'absolute', top: '15px', right: '15px', width: '8px', height: '8px', borderTop: '2px solid var(--color-gold)', borderRight: '2px solid var(--color-gold)' }} />
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-gold)', borderLeft: '2px solid var(--color-gold)' }} />
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-gold)', borderRight: '2px solid var(--color-gold)' }} />
          </div>
        )}
      </div>

      <style>{`
        @keyframes lid-fly {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          40% {
            transform: translateY(-30px) rotate(-6deg) scale(1.02);
            opacity: 1;
          }
          100% {
            transform: translateY(-90px) rotate(-15deg) scale(0.75);
            opacity: 0;
          }
        }

        @keyframes ribbon-untie {
          0% {
            transform: translateX(-50%) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateX(-50%) scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: translateX(-50%) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
