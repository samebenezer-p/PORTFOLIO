/* ================================================================
   NEXUS OS — Particle System
   Canvas-based floating luminous particles for background ambience
   ================================================================ */

class ParticleSystem {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.rafId = null;
    this.isRunning = false;

    // Config
    this.config = {
      count:       options.count       || 60,
      color:       options.color       || '0, 212, 255',
      maxSize:     options.maxSize     || 2,
      minSize:     options.minSize     || 0.5,
      maxSpeed:    options.maxSpeed    || 0.3,
      maxOpacity:  options.maxOpacity  || 0.5,
      connect:     options.connect     || true,
      connectDist: options.connectDist || 120,
      mouseEffect: options.mouseEffect || true,
      ...options,
    };

    this.mouse = { x: -1000, y: -1000 };

    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    if (this.config.mouseEffect) {
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }, { passive: true });
    }
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    if (this.particles.length === 0) {
      this.initParticles();
    }
  }

  initParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  createParticle(x, y) {
    const size = Math.random() * (this.config.maxSize - this.config.minSize) + this.config.minSize;
    return {
      x:     x ?? Math.random() * this.canvas.width,
      y:     y ?? Math.random() * this.canvas.height,
      size,
      baseSize: size,
      vx:   (Math.random() - 0.5) * this.config.maxSpeed * 2,
      vy:   (Math.random() - 0.5) * this.config.maxSpeed * 2,
      opacity:     Math.random() * this.config.maxOpacity,
      maxOpacity:  Math.random() * this.config.maxOpacity + 0.1,
      opacityDir:  Math.random() > 0.5 ? 1 : -1,
      opacitySpeed: Math.random() * 0.003 + 0.001,
    };
  }

  update() {
    const { width, height } = this.canvas;
    const mouseInfluence = 80;

    this.particles.forEach((p) => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Pulse opacity
      p.opacity += p.opacitySpeed * p.opacityDir;
      if (p.opacity >= p.maxOpacity || p.opacity <= 0) {
        p.opacityDir *= -1;
        p.opacity = Math.max(0, Math.min(p.maxOpacity, p.opacity));
      }

      // Mouse attraction
      if (this.config.mouseEffect) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseInfluence) {
          const force = (mouseInfluence - dist) / mouseInfluence;
          p.x -= dx * force * 0.01;
          p.y -= dy * force * 0.01;
          p.size = p.baseSize + force * 2;
        } else {
          p.size = p.baseSize;
        }
      }

      // Wrap edges
      if (p.x < -10)         p.x = width  + 10;
      if (p.x > width  + 10) p.x = -10;
      if (p.y < -10)         p.y = height + 10;
      if (p.y > height + 10) p.y = -10;
    });
  }

  draw() {
    const ctx = this.ctx;
    const { width, height } = this.canvas;

    ctx.clearRect(0, 0, width, height);

    // Draw connections
    if (this.config.connect) {
      const connectDist = this.config.connectDist;
      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const a = this.particles[i];
          const b = this.particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectDist) {
            const alpha = (1 - dist / connectDist) * 0.15;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${this.config.color}, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    // Draw particles
    this.particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.config.color}, ${p.opacity})`;
      ctx.fill();

      // Glow
      if (p.size > 1) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.config.color}, ${p.opacity * 0.1})`;
        ctx.fill();
      }
    });
  }

  tick() {
    this.update();
    this.draw();
    if (this.isRunning) {
      this.rafId = requestAnimationFrame(() => this.tick());
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.tick();
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}

// Boot canvas particles (sparse, ambient)
window.bootParticles = new ParticleSystem('boot-canvas', {
  count:       40,
  maxSize:     1.5,
  minSize:     0.3,
  maxSpeed:    0.2,
  maxOpacity:  0.4,
  connect:     true,
  connectDist: 100,
  mouseEffect: false,
});

// Main OS particles (more active)
window.mainParticles = new ParticleSystem('main-canvas', {
  count:       70,
  maxSize:     1.8,
  minSize:     0.4,
  maxSpeed:    0.25,
  maxOpacity:  0.45,
  connect:     true,
  connectDist: 130,
  mouseEffect: true,
});

// Auto-start boot particles
window.bootParticles.start();
