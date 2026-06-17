import React, { useState, useEffect } from 'react';

const wishes = [
  { id: 1, title: "Pure Joy", wish: "May your days be filled with endless laughter and lightweight moments.", color: "radial-gradient(circle at 30% 30%, #ffd166, #f77f00, #d62828)", size: 55, delay: '0s' },
  { id: 2, title: "Infinite Success", wish: "May you conquer every peak and reach new heights in everything you pursue.", color: "radial-gradient(circle at 30% 30%, #83c5be, #006d77, #013a40)", size: 48, delay: '-1.5s' },
  { id: 3, title: "Vibrant Health", wish: "May you always enjoy strength, vitality, wellness, and energy.", color: "radial-gradient(circle at 30% 30%, #a7c957, #6a994e, #386641)", size: 42, delay: '-3s' },
  { id: 4, title: "Breathtaking Adventure", wish: "May the coming year bring you thrilling journeys and beautiful discoveries.", color: "radial-gradient(circle at 30% 30%, #06d6a0, #118ab2, #073b4c)", size: 60, delay: '-0.5s' },
  { id: 5, title: "Inner Peace", wish: "May your heart always remain a calm sanctuary amidst the chaos of life.", color: "radial-gradient(circle at 30% 30%, #e0aaff, #c77dff, #7b2cbf)", size: 45, delay: '-2.2s' },
  { id: 6, title: "Endless Love", wish: "May you always feel enveloped in deep, warm, and genuine affection.", color: "radial-gradient(circle at 30% 30%, #ff85a1, #ff477e, #9b5de5)", size: 64, delay: '-4s' },
  { id: 7, title: "Fulfilling Dreams", wish: "May every secret wish of your heart find its path to manifest in reality.", color: "radial-gradient(circle at 30% 30%, #ffd166, #e9c46a, #e76f51)", size: 50, delay: '-1.8s' },
  { id: 8, title: "Unstoppable Laughter", wish: "May your beautiful smile and laugh brighten up every room you enter.", color: "radial-gradient(circle at 30% 30%, #f4a261, #e76f51, #2a9d8f)", size: 40, delay: '-3.5s' },
  { id: 9, title: "Deep Wisdom", wish: "May each experience bring you closer to understanding, clarity, and peace.", color: "radial-gradient(circle at 30% 30%, #e9d8a6, #ee9b00, #ca6702)", size: 52, delay: '-2.7s' },
  { id: 10, title: "Courageous Heart", wish: "May you always find the strength to stand tall and chase your passions.", color: "radial-gradient(circle at 30% 30%, #ffb5a7, #fcd5ce, #f4978e)", size: 44, delay: '-1.2s' },
  { id: 11, title: "Abounding Prosperity", wish: "May abundance of happiness, success, and wealth flow into your life.", color: "radial-gradient(circle at 30% 30%, #ffccd5, #ffb3c1, #ff758f)", size: 58, delay: '-5s' },
  { id: 12, title: "Pure Inspiration", wish: "May you find beauty, wonder, and art in the smallest moments of life.", color: "radial-gradient(circle at 30% 30%, #90e0ef, #0096c7, #03045e)", size: 46, delay: '-0.8s' },
  { id: 13, title: "Loyal Friendship", wish: "May your path be shared with people who uplift, support, and inspire you.", color: "radial-gradient(circle at 30% 30%, #dddf00, #d4d700, #55a630)", size: 43, delay: '-3.1s' },
  { id: 14, title: "Boundless Creativity", wish: "May your mind paint beautiful ideas and bring new creations into the world.", color: "radial-gradient(circle at 30% 30%, #ea8c55, #c75146, #ad2e24)", size: 55, delay: '-2.4s' },
  { id: 15, title: "Life Harmony", wish: "May your thoughts, actions, and feelings sync into a beautiful, balanced melody.", color: "radial-gradient(circle at 30% 30%, #b5e2fa, #edede9, #d6ccc2)", size: 48, delay: '-4.3s' },
  { id: 16, title: "Grateful Soul", wish: "May your eyes always see the blessings and your heart be full of thanks.", color: "radial-gradient(circle at 30% 30%, #cdb4db, #ffc8dd, #ffafcc)", size: 41, delay: '-1.9s' },
  { id: 17, title: "Fierce Confidence", wish: "May you never doubt the magic, strength, and brilliance you carry inside.", color: "radial-gradient(circle at 30% 30%, #eae2b7, #fcbf49, #f77f00)", size: 53, delay: '-3.8s' },
  { id: 18, title: "Soft Patience", wish: "May you move through life's timing with absolute grace, trust, and ease.", color: "radial-gradient(circle at 30% 30%, #e2e2e2, #b0c4de, #778899)", size: 47, delay: '-2.9s' },
  { id: 19, title: "Thrilling Excitement", wish: "May you experience unexpected miracles that make your pulse race with joy.", color: "radial-gradient(circle at 30% 30%, #f15bb5, #fee440, #00f5d4)", size: 62, delay: '-0.2s' },
  { id: 20, title: "Cozy Warmth", wish: "May your home always be a cozy, safe, and warm shelter of love.", color: "radial-gradient(circle at 30% 30%, #fbc4ab, #f08080, #cd5c5c)", size: 49, delay: '-4.6s' },
  { id: 21, title: "Guiding Light", wish: "May a bright light guide your decisions and keep your path clear.", color: "radial-gradient(circle at 30% 30%, #e3f2fd, #90caf9, #42a5f5)", size: 45, delay: '-1.4s' },
  { id: 22, title: "Gentleness", wish: "May your days be soft, comforting, and filled with peaceful moments.", color: "radial-gradient(circle at 30% 30%, #fae1dd, #fec5bb, #fcd5ce)", size: 40, delay: '-3.3s' },
  { id: 23, title: "Burning Passion", wish: "May your heart burn brightly for the things that make you feel truly alive.", color: "radial-gradient(circle at 30% 30%, #e63946, #a8dadc, #457b9d)", size: 54, delay: '-2.1s' },
  { id: 24, title: "Beautiful Growth", wish: "May you bloom in your own time, becoming the best version of yourself.", color: "radial-gradient(circle at 30% 30%, #b7e4c7, #74c69d, #2d6a4f)", size: 46, delay: '-4.8s' },
  { id: 25, title: "Cosmic Magic", wish: "May you always find enchantment and wonder in this vast, beautiful universe.", color: "radial-gradient(circle at 30% 30%, #dec9e9, #dac3e8, #64dfdf)", size: 51, delay: '-0.7s' },
  { id: 26, title: "Quiet Serenity", wish: "May you find stillness and calm depth in your moments of reflection.", color: "radial-gradient(circle at 30% 30%, #a2d2ff, #bde0fe, #ffafcc)", size: 43, delay: '-3.7s' },
  { id: 27, title: "True Freedom", wish: "May your wings be strong and your courage high, flying wherever you dream.", color: "radial-gradient(circle at 30% 30%, #b388ff, #7c4dff, #651fff)", size: 56, delay: '-1.6s' },
  { id: 28, title: "Pure Fulfillment", wish: "May you look back at this year with sweet satisfaction and look forward with hope.", color: "radial-gradient(circle at 30% 30%, #ffd60a, #ffc300, #000814)", size: 58, delay: '-4.1s' }
];

export default function WishesGalaxy({ triggerSparkles }) {
  const [activeWish, setActiveWish] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePlanetClick = (wish, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    if (triggerSparkles) {
      triggerSparkles(x, y, '#e2b85c');
      setTimeout(() => triggerSparkles(x, y, '#00e5ff'), 150);
    }
    setActiveWish(wish);
  };

  return (
    <section
      className="wishes-galaxy-section"
      style={{
        minHeight: '100vh',
        width: '100%',
        padding: '80px 15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      <div className="container text-center" style={{ zIndex: 12, marginBottom: '40px' }}>
        <h2 
          className="font-luxury-title"
          style={{
            fontSize: 'var(--fs-section-title)',
            marginBottom: '10px',
            textShadow: '0 0 15px rgba(0, 229, 255, 0.4)',
          }}
        >
          Birthday Wishes Galaxy
        </h2>
        <p 
          className="font-romantic-subtitle"
          style={{
            fontSize: 'var(--fs-body)',
            maxWidth: '550px',
            margin: '0 auto',
          }}
        >
          28 glowing planetary coordinates, each carrying a special blessing for your new chapter. Click a planet to decode its wish.
        </p>
      </div>

      {/* Orbiting Cluster of Planets */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: isMobile ? '16px' : '26px',
          maxWidth: '960px',
          width: '100%',
          position: 'relative',
          zIndex: 8,
          padding: '10px',
        }}
      >
        {wishes.map((item) => {
          // Scale size down on mobile to fit 28 planets safely in a 100vh viewport
          const sizeVal = isMobile ? item.size * 0.70 : item.size;
          
          return (
            <button
              key={item.id}
              onClick={(e) => handlePlanetClick(item, e)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: `float-slower 8s ease-in-out infinite alternate`,
                animationDelay: item.delay,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                minWidth: '40px', // Touch safety min width/height buffer
                minHeight: '40px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <div
                style={{
                  width: `${sizeVal}px`,
                  height: `${sizeVal}px`,
                  borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 12px ${item.id % 2 === 0 ? 'rgba(0, 229, 255, 0.35)' : 'rgba(255, 94, 151, 0.35)'}, inset -6px -6px 15px rgba(0,0,0,0.6), inset 4px 4px 10px rgba(255,255,255,0.35)`,
                  position: 'relative',
                }}
              >
                {/* Rings */}
                {(item.id === 6 || item.id === 11 || item.id === 19 || item.id === 27) && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: `${sizeVal * 1.6}px`,
                      height: `${sizeVal * 0.35}px`,
                      border: '1.5px solid rgba(255, 255, 255, 0.25)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%) rotate(-25deg)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Wish Reveal Overlay Card */}
      {activeWish && (
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
          onClick={() => setActiveWish(null)}
        >
          <div
            className="glass-card"
            style={{
              padding: 'clamp(25px, 6vw, 40px) clamp(15px, 4vw, 25px)',
              textAlign: 'center',
              position: 'relative',
              border: '1px solid rgba(0, 229, 255, 0.3)',
              boxShadow: '0 25px 70px rgba(0,0,0,0.9), 0 0 45px rgba(0, 229, 255, 0.2)',
              animation: 'float-faster 5s ease-in-out infinite alternate',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: activeWish.color,
                boxShadow: '0 0 15px rgba(255,255,255,0.4)',
                margin: '0 auto 15px',
              }}
            />
            
            <h3
              className="font-luxury-title"
              style={{
                fontSize: 'clamp(1.05rem, 3.5vw, 1.25rem)',
                color: '#fff',
                marginBottom: '10px',
                letterSpacing: '0.08em',
              }}
            >
              {activeWish.title}
            </h3>

            <p
              style={{
                fontSize: 'var(--fs-body)',
                lineHeight: '1.65',
                color: 'var(--text-secondary)',
                marginBottom: '20px',
                fontWeight: 300,
              }}
            >
              "{activeWish.wish}"
            </p>

            <button
              onClick={() => setActiveWish(null)}
              className="cta-button"
              style={{
                padding: '8px 20px',
                fontSize: '0.78rem',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(0, 229, 255, 0.15))',
                borderColor: 'rgba(0, 229, 255, 0.4)',
                boxShadow: 'none',
                minHeight: '40px',
              }}
            >
              Back to Galaxy
            </button>

            {/* Corner decorations */}
            <div style={{ position: 'absolute', top: '15px', left: '15px', width: '8px', height: '8px', borderTop: '2px solid var(--color-cyan-nebula)', borderLeft: '2px solid var(--color-cyan-nebula)' }} />
            <div style={{ position: 'absolute', top: '15px', right: '15px', width: '8px', height: '8px', borderTop: '2px solid var(--color-cyan-nebula)', borderRight: '2px solid var(--color-cyan-nebula)' }} />
            <div style={{ position: 'absolute', bottom: '15px', left: '15px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-cyan-nebula)', borderLeft: '2px solid var(--color-cyan-nebula)' }} />
            <div style={{ position: 'absolute', bottom: '15px', right: '15px', width: '8px', height: '8px', borderBottom: '2px solid var(--color-cyan-nebula)', borderRight: '2px solid var(--color-cyan-nebula)' }} />
          </div>
        </div>
      )}
    </section>
  );
}
