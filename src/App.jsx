import React, { useState, useEffect, useRef } from 'react';
import SpaceBackground from './components/SpaceBackground';
import ConstellationStory from './components/ConstellationStory';
import SecretMessageGalaxy from './components/SecretMessageGalaxy';
import MoonOfMemories from './components/MoonOfMemories';
import WishesGalaxy from './components/WishesGalaxy';
import HeartUniverse from './components/HeartUniverse';
import CakeCeremony from './components/CakeCeremony';
import GiftBoxExperience from './components/GiftBoxExperience';
import EndingScene from './components/EndingScene';

// Web Audio API Synthesizer with Master Volume Node for real-time control
let audioCtx = null;
let synthInterval = null;
let masterGainNode = null;

const startRomanticSynth = (initialVolume) => {
  if (synthInterval) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  audioCtx = new AudioContextClass();

  // Create a master volume gain node
  masterGainNode = audioCtx.createGain();
  masterGainNode.gain.setValueAtTime(initialVolume, audioCtx.currentTime);
  masterGainNode.connect(audioCtx.destination);

  // Dreamy chord progression: Cmaj9 -> Am9 -> Fmaj9 -> G11
  const chords = [
    [130.81, 196.00, 246.94, 329.63, 392.00], // Cmaj9
    [110.00, 164.81, 261.63, 329.63, 493.88], // Am9
    [87.31, 130.81, 220.00, 329.63, 392.00],  // Fmaj9
    [98.00, 146.83, 246.94, 349.23, 440.00]   // G11
  ];

  let chordIdx = 0;
  let noteIdx = 0;

  const playNextNote = () => {
    if (!audioCtx || audioCtx.state === 'suspended') return;

    const currentChord = chords[chordIdx];
    const frequency = currentChord[noteIdx];
    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    const voiceGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Ambient feedback delay
    const delay = audioCtx.createDelay(1.0);
    const delayGain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(500, now); // Rhodes warm filter

    // Envelope for soft attack and long decay
    voiceGain.gain.setValueAtTime(0, now);
    voiceGain.gain.linearRampToValueAtTime(0.3, now + 0.08);
    voiceGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

    delay.delayTime.setValueAtTime(0.4, now);
    delayGain.gain.setValueAtTime(0.35, now);

    osc.connect(filter);
    filter.connect(voiceGain);
    voiceGain.connect(masterGainNode); // connect voice to master gain

    voiceGain.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(masterGainNode); // connect delay line to master gain
    delayGain.connect(delay);

    osc.start(now);
    osc.stop(now + 2.8);

    noteIdx = (noteIdx + 1) % currentChord.length;
    if (noteIdx === 0) {
      chordIdx = (chordIdx + 1) % chords.length;
    }
  };

  synthInterval = setInterval(playNextNote, 600);
};

const setSynthVolume = (vol) => {
  if (masterGainNode && audioCtx) {
    masterGainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
  }
};

const stopRomanticSynth = () => {
  if (synthInterval) {
    clearInterval(synthInterval);
    synthInterval = null;
  }
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
  masterGainNode = null;
};

export default function App() {
  const bgRef = useRef(null);
  const sectionsRef = useRef([]);

  // Loading & Customization states
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [name, setName] = useState("hello");
  const [showConfig, setShowConfig] = useState(false);

  // Music & Volume states
  const [musicOn, setMusicOn] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.3); // default low volume
  const prevVolumeRef = useRef(0.3);

  // Section Navigation States
  const [activeSection, setActiveSection] = useState(0);
  const [hasBegun, setHasBegun] = useState(false);

  // Read URL query parameter for name customization
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryName = params.get('name');
    if (queryName) {
      setName(queryName);
      localStorage.setItem('girlfriend_name', queryName);
    } else {
      const storedName = localStorage.getItem('girlfriend_name');
      if (storedName) {
        setName(storedName);
      }
    }
  }, []);

  // Loading Screen progress simulation
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setLoadingProgress(progress);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Intersection Observer to track active section for the Canvas particle system
  useEffect(() => {
    if (isLoading || !hasBegun) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.25
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-section-index'));
          setActiveSection(index);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isLoading, hasBegun]);

  const handleBeginJourney = () => {
    setHasBegun(true);

    // Auto-start music if not already started
    if (!musicOn) {
      setMusicOn(true);
      startRomanticSynth(isMuted ? 0 : volume);
    }

    // Trigger initial bursts
    setTimeout(() => {
      if (bgRef.current) {
        bgRef.current.triggerHearts();
        bgRef.current.triggerConfetti();
      }
    }, 200);

    // Scroll to constellation
    setTimeout(() => {
      const firstSection = document.getElementById('constellation-story');
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 600);
  };

  const handleStartMusicFromHero = () => {
    if (!musicOn) {
      setMusicOn(true);
      startRomanticSynth(isMuted ? 0 : volume);
    }
  };

  const handleTogglePlayPause = () => {
    if (musicOn) {
      stopRomanticSynth();
      setMusicOn(false);
    } else {
      setMusicOn(true);
      startRomanticSynth(isMuted ? 0 : volume);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      setSynthVolume(volume);
    } else {
      setIsMuted(true);
      setSynthVolume(0);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0) {
      setIsMuted(false);
    }
    if (musicOn) {
      setSynthVolume(newVol);
    }
  };

  const saveCustomName = (newName) => {
    if (!newName) return;
    setName(newName);
    localStorage.setItem('girlfriend_name', newName);
    setShowConfig(false);
  };

  if (isLoading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#030107',
          color: '#fff',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '30px',
          padding: '20px',
        }}
      >
        <div style={{ position: 'relative', width: '50px', height: '50px', animation: 'pulse-star 2s infinite ease-in-out' }}>
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '100%', height: '100%', color: '#ffd166', filter: 'drop-shadow(0 0 15px #ffd166)' }}>
            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.785 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.133 9.21l8.2-1.192z" />
          </svg>
        </div>

        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <h2 className="font-luxury-title" style={{ fontSize: '0.95rem', letterSpacing: '0.2em', color: 'var(--text-secondary)' }}>
            A Special Journey Is About To Begin
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-gold)' }}>
            Dedicated to: <span style={{ fontWeight: 500, letterSpacing: '0.05em' }}>{name}</span>
          </div>
        </div>

        <div style={{ width: '200px', height: '2px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${loadingProgress}%`, height: '100%', backgroundColor: 'var(--color-romantic-pink)', transition: 'width 0.15s ease' }} />
        </div>
        
        <button
          onClick={() => setShowConfig(!showConfig)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'underline' }}
        >
          Change Dedication Name
        </button>

        {showConfig && (
          <div className="glass-card" style={{ padding: '15px', display: 'flex', gap: '10px', width: 'auto' }}>
            <input
              type="text"
              defaultValue={name}
              placeholder="Enter name"
              id="nameInput"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '6px 10px', color: '#fff', fontSize: '0.85rem' }}
            />
            <button
              onClick={() => saveCustomName(document.getElementById('nameInput').value)}
              className="cta-button"
              style={{ padding: '6px 12px', fontSize: '0.7rem', borderRadius: '6px', minHeight: '32px' }}
            >
              Save
            </button>
          </div>
        )}

        {loadingProgress === 100 && (
          <button
            onClick={() => setIsLoading(false)}
            className="cta-button"
            style={{ padding: '10px 28px', fontSize: '0.85rem' }}
          >
            Enter the Universe
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <SpaceBackground ref={bgRef} activeSection={activeSection} />

      {/* Floating Advanced Glassmorphism Audio Deck */}
      <div className={`audio-deck ${!musicOn ? 'paused' : ''}`}>
        <button
          onClick={handleTogglePlayPause}
          className="audio-btn"
          title={musicOn ? "Pause music" : "Play music"}
          style={{ width: '32px', height: '32px' }}
        >
          {musicOn ? (
            /* Pause Icon */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="4" width="4" height="16" /><rect x="16" y="4" width="4" height="16" /></svg>
          ) : (
            /* Play Icon */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21" /></svg>
          )}
        </button>

        <button
          onClick={handleToggleMute}
          className="audio-btn"
          title={isMuted ? "Unmute" : "Mute"}
          style={{ width: '32px', height: '32px' }}
        >
          {isMuted || volume === 0 ? (
            /* Mute Icon */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" /></svg>
          ) : (
            /* Volume Icon */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
          )}
        </button>

        <div className="volume-slider-container">
          <input
            type="range"
            min="0"
            max="0.8"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            title="Adjust Volume"
          />
        </div>

        <div className="deck-bars">
          <div className="deck-bar" />
          <div className="deck-bar" />
          <div className="deck-bar" />
        </div>
      </div>

      {/* HERO SECTION */}
      <section
        data-section-index={1}
        ref={(el) => (sectionsRef.current[0] = el)}
        className="hero-section"
        style={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10,
          padding: '20px 10px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 'min(350px, 90vw)',
            height: 'min(350px, 90vw)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(142, 68, 173, 0.15) 0%, rgba(255, 94, 151, 0.05) 50%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Central Glass Card */}
        <div
          className="glass-card"
          style={{
            padding: 'clamp(30px, 5vw, 55px) clamp(15px, 4vw, 35px)',
            textAlign: 'center',
            zIndex: 5,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '1.5rem', color: 'var(--color-romantic-pink)', animation: 'pulse-star 2s infinite ease-in-out' }}>
            ✦
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1 className="font-luxury-title" style={{ fontSize: 'var(--fs-hero-title)', margin: 0, letterSpacing: '0.15em' }}>
              Happy Birthday 
            </h1>
            <h1 className="font-luxury-title font-calligraphy" style={{ fontSize: 'var(--fs-hero-name)', margin: '5px 0 0', color: 'var(--color-gold)' }}>
              {name}
            </h1>
          </div>

          <p className="font-romantic-subtitle" style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto', fontSize: 'var(--fs-body)' }}>
            "Among Billions Of Stars In This Universe, You Will Always Be My Favorite One."
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', alignItems: 'center', marginTop: '10px' }}>
            {!musicOn && (
              <button
                onClick={handleStartMusicFromHero}
                className="cta-button"
                style={{
                  background: 'linear-gradient(135deg, rgba(226, 184, 92, 0.25), rgba(10, 5, 20, 0.6))',
                  borderColor: 'rgba(226, 184, 92, 0.45)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.3), 0 0 15px rgba(226, 184, 92, 0.25)',
                }}
              >
                🎵 Start The Music
              </button>
            )}

            <button onClick={handleBeginJourney} className="cta-button" style={{ animation: 'pulse-star 3s infinite' }}>
              Begin The Journey ❤️
            </button>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      {hasBegun && (
        <div className="universe-timeline" style={{ width: '100%' }}>
          {/* Constellation Story Section */}
          <div id="constellation-story" style={{ width: '100%' }}>
            <ConstellationStory />
          </div>

          {/* Secret Message Galaxy Section */}
          <div ref={(el) => (sectionsRef.current[1] = el)} data-section-index={3} style={{ width: '100%' }}>
            <SecretMessageGalaxy
              triggerSparkles={(x, y, color) => bgRef.current?.triggerSparkles(x, y, color)}
            />
          </div>

          {/* Moon of Memories Section */}
          <div ref={(el) => (sectionsRef.current[2] = el)} data-section-index={4} style={{ width: '100%' }}>
            <MoonOfMemories
              name={name}
              triggerSparkles={(x, y, color) => bgRef.current?.triggerSparkles(x, y, color)}
            />
          </div>

          {/* Birthday Wishes Galaxy Section */}
          <div ref={(el) => (sectionsRef.current[3] = el)} data-section-index={5} style={{ width: '100%' }}>
            <WishesGalaxy
              triggerSparkles={(x, y, color) => bgRef.current?.triggerSparkles(x, y, color)}
            />
          </div>

          {/* Floating Heart Universe Section */}
          <div ref={(el) => (sectionsRef.current[4] = el)} data-section-index={6} style={{ width: '100%' }}>
            <HeartUniverse
              triggerSparkles={(x, y, color) => bgRef.current?.triggerSparkles(x, y, color)}
            />
          </div>

          {/* Cake Ceremony Section */}
          <div ref={(el) => (sectionsRef.current[5] = el)} data-section-index={7} style={{ width: '100%' }}>
            <CakeCeremony
              triggerConfetti={(x, y) => bgRef.current?.triggerConfetti(x, y)}
              triggerSparkles={(x, y, color) => bgRef.current?.triggerSparkles(x, y, color)}
            />
          </div>

          {/* Gift Box Section */}
          <div ref={(el) => (sectionsRef.current[6] = el)} data-section-index={8} style={{ width: '100%' }}>
            <GiftBoxExperience
              triggerSparkles={(x, y, color) => bgRef.current?.triggerSparkles(x, y, color)}
            />
          </div>

          {/* Ultimate Universe Ending Section */}
          <div ref={(el) => (sectionsRef.current[7] = el)} data-section-index={9} style={{ width: '100%' }}>
            <EndingScene
              name={name}
              triggerSparkles={(x, y, color) => bgRef.current?.triggerSparkles(x, y, color)}
              triggerConfetti={(x, y) => bgRef.current?.triggerConfetti(x, y)}
            />
          </div>
        </div>
      )}
    </>
  );
}
