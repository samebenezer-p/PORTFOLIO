/* ================================================================
   NEXUS OS — Scroll Animation Reveal System
   Uses IntersectionObserver to trigger cinematic entries on scroll
   ================================================================ */

class ScrollRevealEngine {
  constructor() {
    this.reveals = document.querySelectorAll('[data-reveal]');
    this.observer = null;
    this.init();
  }

  init() {
    if (this.reveals.length === 0) return;

    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          this.observer.unobserve(entry.target); // Reveal only once
        }
      });
    }, observerOptions);

    this.reveals.forEach(el => this.observer.observe(el));
  }
}

window.ScrollRevealEngine = ScrollRevealEngine;
