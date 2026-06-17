import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';

const SpaceBackground = forwardRef(({ activeSection = 0 }, ref) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const scrollRef = useRef(0);
  const particlesRef = useRef({
    stars: [],
    dust: [],
    shootingStars: [],
    explosions: [],
    confetti: [],
    ambientHearts: []
  });

  // Expose triggers to parent components via ref
  useImperativeHandle(ref, () => ({
    triggerConfetti: (x, y) => {
      const colors = ['#ff5e97', '#e2b85c', '#00e5ff', '#8e44ad', '#ff3366', '#ffdd57'];
      for (let i = 0; i < 150; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 3 + Math.random() * 8;
        particlesRef.current.confetti.push({
          x: x || window.innerWidth / 2,
          y: y || window.innerHeight / 2,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - (2 + Math.random() * 3), // slight upward bias
          size: 4 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: -10 + Math.random() * 20,
          gravity: 0.15,
          alpha: 1,
          decay: 0.005 + Math.random() * 0.01
        });
      }
    },
    triggerSparkles: (x, y, color = '#e2b85c') => {
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 5;
        particlesRef.current.explosions.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: 2 + Math.random() * 4,
          color,
          alpha: 1,
          decay: 0.01 + Math.random() * 0.02,
          pulse: Math.random() * 10
        });
      }
    },
    triggerHearts: (x, y) => {
      for (let i = 0; i < 20; i++) {
        particlesRef.current.ambientHearts.push({
          x: x || Math.random() * window.innerWidth,
          y: y || window.innerHeight + 50,
          vx: -1 + Math.random() * 2,
          vy: -1 - Math.random() * 3,
          size: 10 + Math.random() * 15,
          alpha: 1,
          decay: 0.003 + Math.random() * 0.005,
          oscillationSpeed: 0.02 + Math.random() * 0.03,
          oscillationAmplitude: 1 + Math.random() * 2,
          phase: Math.random() * 100
        });
      }
    }
  }));

  // Handle Resize & Scroll & Mouse Events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
      initDust();
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleMouseMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Initialize particles
    const initStars = () => {
      const count = Math.min(250, Math.floor((window.innerWidth * window.innerHeight) / 6000));
      const stars = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 0.5 + Math.random() * 1.8,
          alpha: 0.2 + Math.random() * 0.8,
          twinkleSpeed: 0.01 + Math.random() * 0.03,
          twinklePhase: Math.random() * Math.PI * 2,
          depth: 0.1 + Math.random() * 0.9, // for parallax
          color: ['#ffffff', '#fff0f5', '#e6e6fa', '#f0f8ff', '#ffe4e1'][Math.floor(Math.random() * 5)]
        });
      }
      particlesRef.current.stars = stars;
    };

    const initDust = () => {
      const count = 40;
      const dust = [];
      for (let i = 0; i < count; i++) {
        dust.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 1 + Math.random() * 3,
          alpha: 0.1 + Math.random() * 0.4,
          vx: -0.2 + Math.random() * 0.4,
          vy: -0.1 - Math.random() * 0.3, // moving upward
          depth: 0.3 + Math.random() * 0.7,
          color: ['#8e44ad', '#ff5e97', '#00e5ff'][Math.floor(Math.random() * 3)]
        });
      }
      particlesRef.current.dust = dust;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    resizeCanvas();

    // Render loop
    let animationFrameId;
    
    const drawHeart = (c, x, y, size, alpha) => {
      c.save();
      c.globalAlpha = alpha;
      c.fillStyle = 'rgba(255, 94, 151, 0.7)';
      c.shadowColor = 'rgba(255, 94, 151, 0.8)';
      c.shadowBlur = 10;
      c.beginPath();
      c.moveTo(x, y + size / 4);
      c.quadraticCurveTo(x, y, x + size / 2, y);
      c.quadraticCurveTo(x + size, y, x + size, y + size / 3);
      c.quadraticCurveTo(x + size, y + size * (2/3), x, y + size * 1.1);
      c.quadraticCurveTo(x - size, y + size * (2/3), x - size, y + size / 3);
      c.quadraticCurveTo(x - size, y, x - size / 2, y);
      c.quadraticCurveTo(x, y, x, y + size / 4);
      c.closePath();
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const scrollY = scrollRef.current;

      // 1. Mouse Follow Glowing Halo (Nebula glow)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      if (mouse.active) {
        const glowRad = Math.min(width, height) * 0.35;
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, glowRad);
        grad.addColorStop(0, 'rgba(142, 68, 173, 0.12)');
        grad.addColorStop(0.5, 'rgba(255, 94, 151, 0.04)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Add a subtle ambient cyan nebula in bottom-left and purple in top-right
      const ambientGrad1 = ctx.createRadialGradient(0, height, 0, 0, height, width * 0.6);
      ambientGrad1.addColorStop(0, 'rgba(0, 229, 255, 0.06)');
      ambientGrad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGrad1;
      ctx.fillRect(0, 0, width, height);

      const ambientGrad2 = ctx.createRadialGradient(width, 0, 0, width, 0, width * 0.7);
      ambientGrad2.addColorStop(0, 'rgba(142, 68, 173, 0.08)');
      ambientGrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = ambientGrad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Twinkling Parallax Stars
      const particles = particlesRef.current;
      particles.stars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkleAlpha = star.alpha * (0.3 + 0.7 * Math.abs(Math.sin(star.twinklePhase)));
        
        // Calculate parallax y offset
        const parallaxY = (star.y - scrollY * star.depth) % height;
        const finalY = parallaxY < 0 ? parallaxY + height : parallaxY;

        ctx.save();
        ctx.globalAlpha = twinkleAlpha;
        ctx.fillStyle = star.color;
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = star.size > 1.2 ? 5 : 0;
        ctx.beginPath();
        ctx.arc(star.x, finalY, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 3. Draw Cosmic Dust (Drifting upward)
      particles.dust.forEach(d => {
        d.y += d.vy;
        d.x += d.vx;
        
        if (d.y < -10) d.y = height + 10;
        if (d.x < -10) d.x = width + 10;
        if (d.x > width + 10) d.x = -10;

        const parallaxY = (d.y - scrollY * d.depth) % height;
        const finalY = parallaxY < 0 ? parallaxY + height : parallaxY;

        ctx.save();
        ctx.globalAlpha = d.alpha;
        ctx.fillStyle = d.color;
        ctx.shadowColor = d.color;
        ctx.shadowBlur = d.size * 2;
        ctx.beginPath();
        ctx.arc(d.x, finalY, d.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 4. Update & Draw Shooting Stars (diagonally down-left)
      if (Math.random() < (activeSection === 8 ? 0.03 : 0.004)) {
        // More shooting stars in the final scene (activeSection 8)
        particles.shootingStars.push({
          x: Math.random() * width * 1.5,
          y: -50,
          dx: -4 - Math.random() * 8,
          dy: 4 + Math.random() * 8,
          length: 80 + Math.random() * 120,
          thickness: 1 + Math.random() * 2,
          speed: 12 + Math.random() * 15,
          alpha: 1,
          color: ['#fff', '#ffd700', '#ffc0cb'][Math.floor(Math.random() * 3)]
        });
      }

      particles.shootingStars = particles.shootingStars.filter(s => {
        s.x += s.dx;
        s.y += s.dy;
        s.alpha -= 0.012;
        
        if (s.alpha <= 0) return false;

        ctx.save();
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.thickness;
        ctx.globalAlpha = s.alpha;
        
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.dx * 5, s.y - s.dy * 5);
        grad.addColorStop(0, s.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.strokeStyle = grad;
        
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.dx * 3, s.y - s.dy * 3);
        ctx.stroke();
        ctx.restore();

        return s.x > -200 && s.y < height + 200;
      });

      // 5. Update & Draw Sparkle Explosions
      particles.explosions = particles.explosions.filter(exp => {
        exp.x += exp.vx;
        exp.y += exp.vy;
        exp.alpha -= exp.decay;
        
        if (exp.alpha <= 0) return false;

        ctx.save();
        ctx.globalAlpha = exp.alpha;
        ctx.fillStyle = exp.color;
        
        // draw a glowing diamond sparkle shape
        ctx.shadowColor = exp.color;
        ctx.shadowBlur = exp.size * 3;
        
        ctx.beginPath();
        const r = exp.size * (0.6 + 0.4 * Math.sin(exp.pulse));
        ctx.moveTo(exp.x, exp.y - r);
        ctx.lineTo(exp.x + r * 0.4, exp.y - r * 0.4);
        ctx.lineTo(exp.x + r, exp.y);
        ctx.lineTo(exp.x + r * 0.4, exp.y + r * 0.4);
        ctx.lineTo(exp.x, exp.y + r);
        ctx.lineTo(exp.x - r * 0.4, exp.y + r * 0.4);
        ctx.lineTo(exp.x - r, exp.y);
        ctx.lineTo(exp.x - r * 0.4, exp.y - r * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        return true;
      });

      // 6. Update & Draw Confetti (with physics, rotation, gravity)
      particles.confetti = particles.confetti.filter(c => {
        c.vy += c.gravity;
        c.x += c.vx;
        c.y += c.vy;
        c.rotation += c.rotationSpeed;
        c.alpha -= c.decay;

        if (c.alpha <= 0 || c.y > height + 20) return false;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.globalAlpha = c.alpha;
        ctx.fillStyle = c.color;
        ctx.shadowColor = c.color;
        ctx.shadowBlur = 4;
        
        // Draw confetti rectangle
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size / 2);
        ctx.restore();

        return true;
      });

      // 7. Ambient Floating Hearts
      particles.ambientHearts = particles.ambientHearts.filter(h => {
        h.phase += h.oscillationSpeed;
        h.x += h.vx + Math.sin(h.phase) * h.oscillationAmplitude * 0.1;
        h.y += h.vy;
        h.alpha -= h.decay;

        if (h.alpha <= 0 || h.y < -50) return false;

        drawHeart(ctx, h.x, h.y, h.size, h.alpha);
        return true;
      });

      // Spawn periodic ambient hearts in background when in section 5 (Hearts)
      if (activeSection === 5 && Math.random() < 0.04) {
        particles.ambientHearts.push({
          x: Math.random() * width,
          y: height + 30,
          vx: -0.5 + Math.random() * 1.0,
          vy: -0.8 - Math.random() * 1.5,
          size: 8 + Math.random() * 12,
          alpha: 0.8,
          decay: 0.002 + Math.random() * 0.004,
          oscillationSpeed: 0.01 + Math.random() * 0.02,
          oscillationAmplitude: 1 + Math.random() * 1.5,
          phase: Math.random() * 100
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeSection]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1, // behind all interactive layouts
        pointerEvents: 'none', // pass events through to sections
        backgroundColor: '#030107'
      }}
    />
  );
});

export default SpaceBackground;
