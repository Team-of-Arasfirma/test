import React, { useState, useEffect } from 'react';

const secretMessages = [
  { id: 1, text: "You are my favorite notification.", x: 18, y: 15, size: 24, speed: '8s' },
  { id: 2, text: "Your smile lights up my darkest days.", x: 78, y: 20, size: 28, speed: '11s' },
  { id: 3, text: "Every moment with you feels magical.", x: 48, y: 35, size: 22, speed: '9s' },
  { id: 4, text: "Thank you for making life beautiful.", x: 20, y: 68, size: 30, speed: '13s' },
  { id: 5, text: "You are the best chapter of my story.", x: 78, y: 78, size: 26, speed: '10s' },
  { id: 6, text: "My favorite place in the entire universe is next to you.", x: 48, y: 82, size: 30, speed: '14s' },
  { id: 7, text: "Among billions of souls, mine chose yours.", x: 12, y: 44, size: 24, speed: '7s' },
  { id: 8, text: "You make my heart beat in sync with yours.", x: 84, y: 48, size: 26, speed: '12s' },
  { id: 9, text: "hello, you are my favorite star in every universe.", x: 48, y: 56, size: 34, speed: '9.5s', isSpecial: true }
];

export default function SecretMessageGalaxy({ triggerSparkles }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', checkMobile);
    checkMobile();
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleStarClick = (msg, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    if (triggerSparkles) {
      triggerSparkles(x, y, msg.isSpecial ? '#ffd700' : '#ff5e97');
      setTimeout(() => triggerSparkles(x, y, '#ffffff'), 150);
    }
    
    setSelectedMessage(msg);
  };

  // Adjust coordinates slightly for mobile viewports
  const getResponsiveCoords = (msg) => {
    if (!isMobile) return { x: msg.x, y: msg.y };
    // Compress coordinates to fit portrait screens safely
    // Compress X coordinates to center region (22% to 78%)
    const rx = 22 + (msg.x / 100) * 56;
    // Stretch Y coordinates vertically to give more space (12% to 88%)
    const ry = 12 + (msg.y / 100) * 76;
    return { x: rx, y: ry };
  };

  return (
    <section 
      className="secret-galaxy-section"
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '80px 15px',
        overflow: 'hidden',
      }}
    >
      <div className="container text-center" style={{ zIndex: 10 }}>
        <h2 
          className="font-luxury-title"
          style={{
            fontSize: 'var(--fs-section-title)',
            marginBottom: '10px',
            textShadow: '0 0 15px rgba(255, 94, 151, 0.4)',
          }}
        >
          Secret Message Galaxy
        </h2>
        <p 
          className="font-romantic-subtitle"
          style={{
            fontSize: 'var(--fs-body)',
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            margin: '0 auto 20px',
          }}
        >
          A cluster of floating stars holding hidden thoughts. Tap the stars to release their light.
        </p>
      </div>

      {/* Floating Galaxy Area */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '70vh' : '62vh',
          maxWidth: '1000px',
          margin: '0 auto',
          zIndex: 8,
        }}
      >
        {secretMessages.map((msg) => {
          const { x, y } = getResponsiveCoords(msg);
          const sizeVal = isMobile ? msg.size * 0.82 : msg.size;
          
          return (
            <button
              key={msg.id}
              onClick={(e) => handleStarClick(msg, e)}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                animation: `float ${msg.speed} ease-in-out infinite alternate`,
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: msg.isSpecial ? 15 : 10,
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: `${sizeVal}px`,
                  height: `${sizeVal}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  style={{
                    width: '100%',
                    height: '100%',
                    color: msg.isSpecial ? '#ffd166' : 'rgba(255, 255, 255, 0.88)',
                    filter: msg.isSpecial 
                      ? 'drop-shadow(0 0 12px rgba(226, 184, 92, 0.9))' 
                      : 'drop-shadow(0 0 8px rgba(255, 94, 151, 0.75))',
                    transition: 'transform 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.22) rotate(15deg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.785 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.133 9.21l8.2-1.192z"/>
                </svg>
                
                {/* Special pulsing ring around key star */}
                {msg.isSpecial && (
                  <div 
                    style={{
                      position: 'absolute',
                      width: '240%',
                      height: '240%',
                      border: '1.5px solid rgba(226, 184, 92, 0.45)',
                      borderRadius: '50%',
                      animation: 'pulse-ring 2.5s infinite',
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Glassmorphic Message Popup */}
      {selectedMessage && (
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
          onClick={() => setSelectedMessage(null)}
        >
          <div
            className="glass-card"
            style={{
              padding: 'clamp(30px, 6vw, 45px) clamp(20px, 4vw, 30px)',
              textAlign: 'center',
              position: 'relative',
              border: selectedMessage.isSpecial ? '1px solid rgba(226, 184, 92, 0.4)' : '1px solid rgba(255, 94, 151, 0.3)',
              boxShadow: selectedMessage.isSpecial 
                ? '0 30px 60px rgba(0, 0, 0, 0.85), 0 0 40px rgba(226, 184, 92, 0.25)'
                : '0 30px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(255, 94, 151, 0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              style={{
                fontSize: '1.8rem',
                color: selectedMessage.isSpecial ? 'var(--color-gold)' : 'var(--color-romantic-pink)',
                marginBottom: '15px',
              }}
            >
              {selectedMessage.isSpecial ? '⭐' : '❤️'}
            </div>
            
            <p
              style={{
                fontSize: 'clamp(1rem, 3.5vw, 1.25rem)',
                lineHeight: '1.6',
                color: '#fff',
                marginBottom: '20px',
                fontWeight: selectedMessage.isSpecial ? '400' : '300',
              }}
            >
              "{selectedMessage.text}"
            </p>

            <button
              onClick={() => setSelectedMessage(null)}
              className="cta-button"
              style={{
                padding: '8px 20px',
                fontSize: '0.78rem',
                borderRadius: '20px',
                background: selectedMessage.isSpecial 
                  ? 'linear-gradient(135deg, rgba(226,184,92,0.1), rgba(10,5,20,0.6))'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 94, 151, 0.15))',
                borderColor: selectedMessage.isSpecial ? 'rgba(226, 184, 92, 0.4)' : 'rgba(255, 94, 151, 0.4)',
                boxShadow: 'none',
                minHeight: '40px',
              }}
            >
              Close
            </button>

            {/* Glowing borders */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', width: '8px', height: '8px', borderTop: '2.5px solid var(--color-romantic-pink)', borderLeft: '2.5px solid var(--color-romantic-pink)' }} />
            <div style={{ position: 'absolute', top: '15px', right: '15px', width: '8px', height: '8px', borderTop: '2.5px solid var(--color-romantic-pink)', borderRight: '2.5px solid var(--color-romantic-pink)' }} />
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '8px', height: '8px', borderBottom: '2.5px solid var(--color-romantic-pink)', borderLeft: '2.5px solid var(--color-romantic-pink)' }} />
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '8px', height: '8px', borderBottom: '2.5px solid var(--color-romantic-pink)', borderRight: '2.5px solid var(--color-romantic-pink)' }} />
          </div>
        </div>
      )}
    </section>
  );
}
