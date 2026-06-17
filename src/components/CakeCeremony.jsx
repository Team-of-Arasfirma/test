import React, { useState, useEffect } from 'react';

export default function CakeCeremony({ triggerConfetti, triggerSparkles }) {
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', checkMobile);
    checkMobile();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCandleClick = (e) => {
    if (isBlownOut) return;

    setIsBlownOut(true);
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (triggerConfetti) {
      triggerConfetti(x, y);
      setTimeout(() => triggerConfetti(x, y - 40), 300);
      setTimeout(() => triggerConfetti(x - 80, y), 600);
      setTimeout(() => triggerConfetti(x + 80, y), 600);
    }
    
    if (triggerSparkles) {
      triggerSparkles(x, y, '#ffd700');
      setTimeout(() => triggerSparkles(x, y, '#ff5e97'), 200);
    }

    setTimeout(() => {
      setShowCelebration(true);
    }, 800);
  };

  return (
    <section
      className="cake-ceremony-section"
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
          opacity: showCelebration ? 0.3 : 1,
          transition: 'opacity 0.8s ease',
        }}
      >
        <h2 
          className="font-luxury-title"
          style={{
            fontSize: 'var(--fs-section-title)',
            marginBottom: '10px',
            textShadow: '0 0 15px rgba(255, 94, 151, 0.4)',
          }}
        >
          Birthday Cake Ceremony
        </h2>
        <p 
          className="font-romantic-subtitle"
          style={{
            fontSize: 'var(--fs-body)',
            maxWidth: '500px',
            margin: '0 auto',
          }}
        >
          {isBlownOut 
            ? "Your wish has been cast into the cosmos!" 
            : "Close your eyes, make a beautiful birthday wish, and click the candle to blow it out."}
        </p>
      </div>

      {/* 3D Cake Scene Container */}
      <div
        style={{
          perspective: '1000px',
          width: '280px',
          height: '280px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 8,
          // CSS scale transformation on mobile to prevent clipping
          transform: isMobile ? 'scale(0.8)' : 'scale(1)',
          transition: 'transform 0.4s ease',
        }}
      >
        {/* Cake Stand */}
        <div
          className="cake-stand"
          style={{
            position: 'absolute',
            bottom: '20px',
            width: '260px',
            height: '75px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '50%',
            transform: 'rotateX(60deg)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255, 94, 151, 0.2), inset 0 0 15px rgba(255,255,255,0.1)',
            backdropFilter: 'blur(5px)',
          }}
        />
        
        {/* Tiers */}
        <div
          style={{
            transform: 'translateY(-10px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          {/* Bottom */}
          <div className="cake-tier tier-bottom" style={{ width: '200px', height: '55px' }}>
            <div className="tier-top" style={{ width: '200px', height: '36px', background: '#e05780' }} />
            <div className="tier-side" style={{ width: '200px', height: '46px', background: 'linear-gradient(to bottom, #c93d67, #7a1c38)' }} />
          </div>

          {/* Middle */}
          <div className="cake-tier tier-middle" style={{ width: '150px', height: '46px', marginTop: '-23px' }}>
            <div className="tier-top" style={{ width: '150px', height: '28px', background: '#ff70a6' }} />
            <div className="tier-side" style={{ width: '150px', height: '38px', background: 'linear-gradient(to bottom, #d6477d, #8f2149)' }} />
          </div>

          {/* Top */}
          <div className="cake-tier tier-top-level" style={{ width: '100px', height: '40px', marginTop: '-18px' }}>
            <div className="tier-top" style={{ width: '100px', height: '20px', background: '#ffd166' }} />
            <div className="tier-side" style={{ width: '100px', height: '32px', background: 'linear-gradient(to bottom, #e2b85c, #9c7827)' }} />
          </div>

          {/* Frosting details */}
          <div 
            style={{
              position: 'absolute',
              top: '55%',
              width: '100px',
              height: '6px',
              background: 'linear-gradient(to bottom, #ffffff, transparent)',
              borderRadius: '0 0 6px 6px',
              opacity: 0.8,
            }}
          />

          {/* Candle */}
          <div
            onClick={handleCandleClick}
            style={{
              position: 'absolute',
              top: '-18px',
              width: '10px',
              height: '30px',
              background: 'linear-gradient(to right, #ffffff, #dddddd, #bbbbbb)',
              borderRadius: '2px',
              cursor: isBlownOut ? 'default' : 'pointer',
              display: 'flex',
              justifyContent: 'center',
              boxShadow: '0 3px 5px rgba(0,0,0,0.3)',
              minHeight: '30px', // Candle touch bounds
              minWidth: '20px',
            }}
          >
            {!isBlownOut ? (
              <div
                className="flame"
                style={{
                  position: 'absolute',
                  top: '-20px',
                  width: '12px',
                  height: '20px',
                  background: 'radial-gradient(circle at 50% 80%, #ffffff 0%, #ffd166 40%, #ff5e00 80%, transparent 100%)',
                  borderRadius: '50% 50% 20% 20%',
                  animation: 'flicker 0.15s infinite alternate',
                  boxShadow: '0 0 15px #ffd166, 0 0 30px #ff5e00',
                  transformOrigin: 'bottom center',
                }}
              />
            ) : (
              <div
                className="smoke"
                style={{
                  position: 'absolute',
                  top: '-12px',
                  width: '2px',
                  height: '12px',
                  backgroundColor: 'rgba(255,255,255,0.4)',
                  filter: 'blur(1px)',
                  animation: 'rise-smoke 1.5s forwards',
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Celebration Modal card */}
      {showCelebration && (
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
          onClick={() => setShowCelebration(false)}
        >
          <div
            className="glass-card"
            style={{
              padding: 'clamp(25px, 5vw, 40px) clamp(15px, 4vw, 25px)',
              textAlign: 'center',
              border: '1px solid rgba(255, 94, 151, 0.4)',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 50px rgba(255, 94, 151, 0.3)',
              animation: 'letter-unfold 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '2.2rem', marginBottom: '15px' }}>🎉✨🎂</div>
            <h3
              className="font-luxury-title"
              style={{
                fontSize: 'clamp(1.15rem, 3.5vw, 1.35rem)',
                color: '#fff',
                marginBottom: '10px',
                letterSpacing: '0.1em',
              }}
            >
              Wish Sent!
            </h3>
            <p
              style={{
                fontSize: 'var(--fs-body)',
                lineHeight: '1.65',
                color: 'var(--text-secondary)',
                fontWeight: 300,
              }}
            >
              "May the universe conspiracy work in your favor, bringing health, joy, and magic to your every day. Your wishes are now written in the stars."
            </p>

            <button
              onClick={() => setShowCelebration(false)}
              className="cta-button"
              style={{
                marginTop: '20px',
                padding: '8px 20px',
                fontSize: '0.78rem',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255, 94, 151, 0.2))',
                borderColor: 'rgba(255, 94, 151, 0.4)',
                boxShadow: 'none',
                minHeight: '40px',
              }}
            >
              Continue the Journey
            </button>
          </div>
        </div>
      )}

      <style>{`
        .cake-tier {
          position: relative;
          transform-style: preserve-3d;
        }

        .tier-top {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 50%;
          transform: rotateX(60deg);
          box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.25);
          z-index: 2;
        }

        .tier-side {
          position: absolute;
          top: 50%;
          left: 0;
          border-radius: 0 0 50% 50% / 0 0 20% 20%;
          box-shadow: inset 0 -10px 20px rgba(0, 0, 0, 0.45);
          z-index: 1;
        }

        @keyframes flicker {
          0% { transform: scale(1) rotate(-1deg); opacity: 0.95; }
          100% { transform: scale(1.08) rotate(1.5deg); opacity: 1; filter: brightness(1.2); }
        }

        @keyframes rise-smoke {
          0% { transform: translateY(0) scaleX(1); opacity: 1; }
          100% { transform: translateY(-30px) scaleX(3); opacity: 0; filter: blur(3px); }
        }
      `}</style>
    </section>
  );
}
