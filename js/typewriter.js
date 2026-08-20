/* ================================================================
   NEXUS OS — Typewriter Engine
   Smooth character-by-character text animation
   ================================================================ */

class Typewriter {
  constructor(element, options = {}) {
    this.element = typeof element === 'string'
      ? document.querySelector(element)
      : element;

    if (!this.element) return;

    this.config = {
      speed:       options.speed       || 60,    // ms per character
      deleteSpeed: options.deleteSpeed || 40,    // ms per delete
      pauseEnd:    options.pauseEnd    || 1800,  // pause at end
      pauseStart:  options.pauseStart  || 400,   // pause at start
      loop:        options.loop        !== false,
      texts:       options.texts       || [],
      onComplete:  options.onComplete  || null,
    };

    this.currentTextIndex = 0;
    this.currentCharIndex = 0;
    this.isDeleting = false;
    this.timer = null;
    this.isPaused = false;
  }

  type() {
    if (this.isPaused) return;

    const fullText = this.config.texts[this.currentTextIndex];
    if (!fullText) return;

    if (this.isDeleting) {
      // Remove one character
      this.currentCharIndex--;
      this.element.textContent = fullText.substring(0, this.currentCharIndex);

      if (this.currentCharIndex === 0) {
        this.isDeleting = false;
        this.currentTextIndex = (this.currentTextIndex + 1) % this.config.texts.length;
        this.timer = setTimeout(() => this.type(), this.config.pauseStart);
        return;
      }

      this.timer = setTimeout(() => this.type(), this.config.deleteSpeed);
    } else {
      // Add one character
      this.currentCharIndex++;
      this.element.textContent = fullText.substring(0, this.currentCharIndex);

      if (this.currentCharIndex === fullText.length) {
        // Finished typing this text
        if (this.config.onComplete) this.config.onComplete();

        if (!this.config.loop && this.currentTextIndex === this.config.texts.length - 1) {
          return; // Stop — no more texts
        }

        this.isDeleting = true;
        this.timer = setTimeout(() => this.type(), this.config.pauseEnd);
        return;
      }

      this.timer = setTimeout(() => this.type(), this.config.speed);
    }
  }

  start(delay = 0) {
    this.timer = setTimeout(() => this.type(), delay);
    return this;
  }

  pause() {
    this.isPaused = true;
    if (this.timer) clearTimeout(this.timer);
  }

  resume() {
    this.isPaused = false;
    this.type();
  }

  stop() {
    this.isPaused = true;
    if (this.timer) clearTimeout(this.timer);
    this.element.textContent = '';
  }

  // Type a single string (no looping)
  static typeOnce(element, text, speed = 50, onDone) {
    const el = typeof element === 'string'
      ? document.querySelector(element)
      : element;

    if (!el) return Promise.resolve();

    return new Promise((resolve) => {
      let i = 0;
      el.textContent = '';

      const tick = () => {
        if (i < text.length) {
          el.textContent += text[i];
          i++;
          setTimeout(tick, speed);
        } else {
          if (onDone) onDone();
          resolve();
        }
      };

      tick();
    });
  }
}

window.Typewriter = Typewriter;
