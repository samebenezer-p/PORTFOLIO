/* ================================================================
   NEXUS OS — Custom Cursor System
   Magnetic, reactive cursor that replaces the browser default
   ================================================================ */

class NexusCursor {
  constructor() {
    this.outer = document.getElementById('cursor-outer');
    this.inner = document.getElementById('cursor-inner');

    this.mouseX = 0;
    this.mouseY = 0;
    this.outerX = 0;
    this.outerY = 0;

    this.isVisible = false;
    this.rafId = null;

    if (!this.outer || !this.inner) return;

    this.init();
  }

  init() {
    // Track mouse position
    document.addEventListener('mousemove', (e) => this.onMouseMove(e), { passive: true });
    document.addEventListener('mouseenter', () => this.show());
    document.addEventListener('mouseleave', () => this.hide());

    // Click effect
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

    // Hover effect on interactive elements
    const interactiveSelectors = 'a, button, .btn, .social-orb, .nav-link, .drawer-link, [data-cursor="hover"]';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactiveSelectors)) {
        document.body.classList.remove('cursor-hover');
      }
    });

    // Start animation loop
    this.animate();
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Inner dot follows immediately
    if (this.inner) {
      this.inner.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }

    if (!this.isVisible) this.show();
  }

  animate() {
    // Outer ring follows with smooth lag
    this.outerX += (this.mouseX - this.outerX) * 0.12;
    this.outerY += (this.mouseY - this.outerY) * 0.12;

    if (this.outer) {
      this.outer.style.transform = `translate(${this.outerX}px, ${this.outerY}px) translate(-50%, -50%)`;
    }

    this.rafId = requestAnimationFrame(() => this.animate());
  }

  show() {
    if (this.isVisible) return;
    this.isVisible = true;
    if (this.outer) this.outer.style.opacity = '1';
    if (this.inner) this.inner.style.opacity = '1';
  }

  hide() {
    this.isVisible = false;
    if (this.outer) this.outer.style.opacity = '0';
    if (this.inner) this.inner.style.opacity = '0';
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}

// Initialize
window.nexusCursor = new NexusCursor();
