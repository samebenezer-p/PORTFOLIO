/* ================================================================
   NEXUS OS — Counter System
   Animates numeric targets when visible on screen
   ================================================================ */

class NumberCounter {
  constructor() {
    this.counters = document.querySelectorAll('[data-target]');
    this.observer = null;
    this.init();
  }

  init() {
    if (this.counters.length === 0) return;

    const observerOptions = {
      root: null,
      threshold: 0.2,
      rootMargin: '0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetEl = entry.target;
          this.animateCounter(targetEl);
          this.observer.unobserve(targetEl); // Run only once
        }
      });
    }, observerOptions);

    this.counters.forEach(counter => this.observer.observe(counter));
  }

  animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;

    let start = 0;
    const duration = 1500; // ms
    const startTime = performance.now();

    // Find if this counter has a matching progress bar to animate
    const card = el.closest('.stat-card');
    const fillBar = card ? card.querySelector('.scb-fill') : null;

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      const current = Math.round(start + target * eased);
      el.textContent = current;

      if (fillBar) {
        fillBar.style.width = `${progress * 100}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target; // Ensure exact final value
        if (fillBar) fillBar.style.width = '100%';
      }
    };

    requestAnimationFrame(update);
  }
}

window.NumberCounter = NumberCounter;
