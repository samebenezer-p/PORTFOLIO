/* ================================================================
   NEXUS OS — Hero Section Controller
   Typewriter titles, orbital system, and hero init
   ================================================================ */

class HeroController {
  constructor() {
    this.typewriterEl = document.getElementById('hero-typewriter');

    this.TITLES = [
      'Java Developer',
      'AI Enthusiast',
      'Backend Developer',
      'Software Engineer Aspirant',
      'CSE Final Year Student',
    ];

    this.typewriter = null;

    // Init after boot
    window.addEventListener('nexus:boot-complete', () => this.init());
  }

  init() {
    this.initTypewriter();
    this.initHeroName();
  }

  // ──────────────────────────────────────────────────────
  //  Typewriter for hero titles
  // ──────────────────────────────────────────────────────

  initTypewriter() {
    if (!this.typewriterEl) return;

    // Delay slightly for entrance animation
    setTimeout(() => {
      this.typewriter = new Typewriter(this.typewriterEl, {
        texts:       this.TITLES,
        speed:       65,
        deleteSpeed: 40,
        pauseEnd:    2000,
        pauseStart:  500,
        loop:        true,
      });
      this.typewriter.start(200);
    }, 600);
  }

  // ──────────────────────────────────────────────────────
  //  Hero name stagger animation
  // ──────────────────────────────────────────────────────

  initHeroName() {
    const lines = document.querySelectorAll('.hn-line');
    lines.forEach((line, i) => {
      line.style.opacity = '0';
      line.style.transform = 'translateX(-40px)';
      line.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s var(--ease-out) ${i * 0.15}s`;

      setTimeout(() => {
        line.style.opacity  = '';
        line.style.transform = '';
      }, 400 + i * 150);
    });
  }
}

window.heroController = new HeroController();
