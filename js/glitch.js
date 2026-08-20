/* ================================================================
   NEXUS OS — Glitch Effect Engine
   RGB-split text glitch for dramatic reveals
   ================================================================ */

class GlitchEffect {
  constructor(element) {
    this.element = typeof element === 'string'
      ? document.querySelector(element)
      : element;
  }

  /**
   * Trigger a timed glitch burst
   * @param {number} duration — total glitch duration in ms
   * @param {number} interval — glitch trigger interval in ms
   */
  trigger(duration = 600, interval = 80) {
    if (!this.element) return Promise.resolve();

    return new Promise((resolve) => {
      let elapsed = 0;
      this.element.classList.add('glitching');

      const tick = setInterval(() => {
        elapsed += interval;

        // Brief pause in middle
        if (elapsed > duration / 2 && elapsed < duration / 2 + interval) {
          this.element.classList.remove('glitching');
          setTimeout(() => this.element.classList.add('glitching'), 50);
        }

        if (elapsed >= duration) {
          clearInterval(tick);
          this.element.classList.remove('glitching');
          resolve();
        }
      }, interval);
    });
  }

  /**
   * Glitch-reveal: element is invisible, then glitches into view
   */
  async revealWithGlitch(options = {}) {
    if (!this.element) return;

    const {
      glitchDuration = 800,
      preDelay       = 0,
      postDelay      = 0,
    } = options;

    await this.delay(preDelay);

    // Make visible
    this.element.style.opacity = '1';

    // Trigger glitch
    await this.trigger(glitchDuration, 70);

    await this.delay(postDelay);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Global glitch utility — glitch any element quickly
 */
function glitchElement(selector, duration = 600) {
  const el = document.querySelector(selector);
  if (!el) return Promise.resolve();
  return new GlitchEffect(el).trigger(duration);
}

window.GlitchEffect  = GlitchEffect;
window.glitchElement = glitchElement;
