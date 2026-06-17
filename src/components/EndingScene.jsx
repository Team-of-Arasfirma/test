import React from 'react';

export default function EndingScene({ name = "hello", triggerSparkles, triggerConfetti }) {
  const handleForeverClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    if (triggerConfetti) {
      triggerConfetti(x, y);
      setTimeout(() => triggerConfetti(x - 80, y), 200);
      setTimeout(() => triggerConfetti(x + 80, y), 200);
    }
    if (triggerSparkles) {
      triggerSparkles(x, y, '#ff5e97');
      setTimeout(() => triggerSparkles(x, y, '#e2b85c'), 150);
      setTimeout(() => triggerSparkles(x, y - 50, '#ffffff'), 300);
    }
  };

  return (
    <section
      className="ending-scene-section"
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: '100px 15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        backgroundColor: 'rgba(2, 0, 5, 0.96)',
        transition: 'background-color 2s ease',
        overflow: 'hidden',
      }}
    >
      {/* Background Soft Moon */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '8%',
          width: 'min(60px, 15vw)',
          height: 'min(60px, 15vw)',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #fffdd0 0%, #f3e5ab 50%, #e2b85c 100%)',
          boxShadow: '0 0 20px rgba(226, 184, 92, 0.3), inset -4px -4px 10px rgba(0,0,0,0.5)',
          opacity: 0.65,
          animation: 'float-slower 9s ease-in-out infinite alternate',
          pointerEvents: 'none',
        }}
      />

      {/* Main Ending Typography Container */}
      <div
        className="container"
        style={{
          maxWidth: '650px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(20px, 5vw, 40px)',
          zIndex: 8,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <h1
            className="font-luxury-title"
            style={{
              fontSize: 'clamp(1.5rem, 5vw, 2.4rem)',
              color: '#fff',
              margin: 0,
              letterSpacing: '0.15em',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.35)',
            }}
          >
            Happy Birthday
          </h1>
          <h1
            className="font-luxury-title font-calligraphy"
            style={{
              fontSize: 'clamp(2.5rem, 9vw, 3.8rem)',
              color: 'var(--color-gold)',
              margin: 0,
              textShadow: '0 0 20px rgba(226, 184, 92, 0.45)',
            }}
          >
            {name}
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '220px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2))' }} />
          <span style={{ color: 'var(--color-romantic-pink)', fontSize: '0.75rem', filter: 'drop-shadow(0 0 4px rgba(255,94,151,0.5))' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(255,255,255,0.2))' }} />
        </div>

        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '18px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 300,
            color: 'var(--text-secondary)',
            fontSize: 'clamp(0.88rem, 3vw, 1.05rem)',
            lineHeight: '1.75',
            letterSpacing: '0.06em',
            width: '100%',
            padding: '0 10px',
          }}
        >
          <p style={{ margin: 0 }}>
            Thank You For Being<br />
            <span style={{ color: '#fff', fontWeight: 400, letterSpacing: '0.1em' }}>THE MOST BEAUTIFUL CHAPTER</span><br />
            Of My Life.
          </p>

          <p style={{ margin: 0, fontSize: 'clamp(0.8rem, 2.5vw, 0.92rem)', color: 'var(--text-muted)' }}>
            I Am Grateful For Every Smile,<br />
            Every Conversation,<br />
            And Every Moment We Share.
          </p>

          <p style={{ margin: 0, color: 'var(--color-romantic-pink)', fontWeight: 400 }}>
            You Will Always Be<br />
            My Favorite Star.
          </p>
        </div>

        <button
          onClick={handleForeverClick}
          className="cta-button"
          style={{
            marginTop: '15px',
            padding: '14px 40px',
            fontSize: '1rem',
            background: 'linear-gradient(135deg, rgba(255, 94, 151, 0.4), rgba(142, 68, 173, 0.4))',
            borderColor: 'rgba(255, 94, 151, 0.55)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.5), 0 0 25px rgba(255, 94, 151, 0.45)',
            borderRadius: '50px',
            animation: 'pulse-star 2.2s infinite ease-in-out',
            minHeight: '48px',
          }}
        >
          Forever ❤️
        </button>
      </div>

      <style>{`
        .ending-scene-section::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: radial-gradient(circle at 50% 50%, rgba(142, 68, 173, 0.08) 0%, transparent 80%);
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </section>
  );
}
