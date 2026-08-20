/* ================================================================
   NEXUS OS — Boot Sequence Controller
   Orchestrates the full cinematic AI OS boot experience
   ================================================================ */

class BootSequence {
  constructor() {
    // DOM references
    this.bootScreen       = document.getElementById('boot-sequence');
    this.terminalLines    = document.getElementById('terminal-lines');
    this.progressFill     = document.getElementById('boot-progress-fill');
    this.progressPct      = document.getElementById('boot-pct');
    this.accessPanel      = document.getElementById('boot-access-panel');
    this.accessReady      = document.getElementById('access-system-ready');
    this.accessGranted    = document.getElementById('access-granted');
    this.accessWelcome    = document.getElementById('access-welcome');
    this.accessNameWrap   = document.getElementById('access-name-wrap');
    this.nameGlitch       = document.querySelector('.name-glitch');
    this.energyTransition = document.getElementById('energy-transition');
    this.bootTimestamp    = document.getElementById('boot-timestamp');

    // Boot messages sequence
    this.MESSAGES = [
      { text: 'Initializing AI Core...',      delay: 380, progress: 10, type: 'ok'   },
      { text: 'Scanning Identity...',          delay: 520, progress: 22, type: 'ok'   },
      { text: 'Loading Projects...',           delay: 400, progress: 33, type: 'ok'   },
      { text: 'Loading Skill Matrix...',       delay: 460, progress: 44, type: 'ok'   },
      { text: 'Loading GitHub...',             delay: 360, progress: 55, type: 'ok'   },
      { text: 'Loading Certifications...',     delay: 410, progress: 66, type: 'ok'   },
      { text: 'Loading Achievements...',       delay: 370, progress: 77, type: 'ok'   },
      { text: 'Loading Experience...',         delay: 420, progress: 88, type: 'ok'   },
      { text: 'Loading Portfolio Modules...', delay: 480, progress: 97, type: 'ok'   },
    ];

    this.currentProgress = 0;
    this.hasCompleted    = false;

    // Allow skipping with any key
    this._skipBound = (e) => this.skip(e);
  }

  // ──────────────────────────────────────────────────────
  //  Helpers
  // ──────────────────────────────────────────────────────

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setTimestamp() {
    if (!this.bootTimestamp) return;
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    this.bootTimestamp.textContent =
      `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ` +
      `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }

  // ──────────────────────────────────────────────────────
  //  Terminal line rendering
  // ──────────────────────────────────────────────────────

  addLine(text, statusType = 'ok', statusText = null) {
    const line = document.createElement('div');
    line.className = 't-line';

    const statusMap = {
      ok:      { class: 't-line-status--ok',      text: '[ OK ]'   },
      success: { class: 't-line-status--success',  text: '[ ✓ ]'   },
      warn:    { class: 't-line-status--warn',     text: '[ WARN ]' },
      error:   { class: 't-line-status--error',    text: '[ ERR ]'  },
    };

    const status = statusMap[statusType] || statusMap.ok;

    line.innerHTML = `
      <span class="t-line-prompt" aria-hidden="true">◈</span>
      <span class="t-line-text"></span>
      <span class="t-line-status ${status.class}" aria-hidden="true">${statusText || status.text}</span>
    `;

    this.terminalLines.appendChild(line);
    this.terminalLines.scrollTop = this.terminalLines.scrollHeight;

    // Typewrite the text
    const textEl = line.querySelector('.t-line-text');
    return this.typeText(textEl, text, 22);
  }

  typeText(element, text, speed) {
    return new Promise(resolve => {
      let i = 0;
      const tick = () => {
        if (i < text.length) {
          element.textContent += text[i];
          i++;
          setTimeout(tick, speed + Math.random() * 15);
        } else {
          resolve();
        }
      };
      tick();
    });
  }

  // ──────────────────────────────────────────────────────
  //  Progress bar
  // ──────────────────────────────────────────────────────

  setProgress(target, duration = 400) {
    const start     = this.currentProgress;
    const diff      = target - start;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      const current = Math.round(start + diff * eased);
      this.currentProgress = current;

      if (this.progressFill) {
        this.progressFill.style.width = `${current}%`;
      }
      if (this.progressPct) {
        this.progressPct.textContent = current;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  // ──────────────────────────────────────────────────────
  //  Access Panel reveals
  // ──────────────────────────────────────────────────────

  async showAccessPanel() {
    // Show the panel container
    this.accessPanel.classList.add('visible');

    await this.delay(300);

    // 1. SYSTEM READY
    if (this.accessReady) {
      this.accessReady.classList.add('show');
    }

    await this.delay(700);

    // 2. ACCESS GRANTED
    if (this.accessGranted) {
      this.accessGranted.classList.add('show');
    }

    await this.delay(800);

    // 3. WELCOME COMMANDER
    if (this.accessWelcome) {
      this.accessWelcome.classList.add('show');
    }

    await this.delay(700);

    // 4. SAM EBENEZER P — with glitch reveal
    if (this.accessNameWrap) {
      this.accessNameWrap.classList.add('show');
    }

    // Trigger glitch effect on the name
    await this.delay(300);
    if (this.nameGlitch) {
      const glitch = new GlitchEffect(this.nameGlitch);
      await glitch.trigger(1000, 80);
    }

    // Hold on name
    await this.delay(1200);

    // Begin energy transition
    await this.triggerEnergyTransition();
  }

  // ──────────────────────────────────────────────────────
  //  Energy Burst Transition
  // ──────────────────────────────────────────────────────

  async triggerEnergyTransition() {
    if (!this.energyTransition) {
      this.finalize();
      return;
    }

    // Intensify reactor glow before burst
    const reactor = document.getElementById('arc-reactor');
    if (reactor) {
      reactor.style.transition = 'filter 0.5s ease';
      reactor.style.filter = 'brightness(3) drop-shadow(0 0 40px #00D4FF)';
    }

    await this.delay(500);

    // Fire the energy burst
    this.energyTransition.classList.add('firing');

    await this.delay(200);

    // Start fading out the boot screen
    if (this.bootScreen) {
      this.bootScreen.style.transition = 'opacity 0.8s ease';
      this.bootScreen.style.opacity    = '0';
    }

    // Simultaneously reveal the main OS
    await this.delay(300);
    this.finalize();
  }

  finalize() {
    if (this.hasCompleted) return;
    this.hasCompleted = true;

    const nexusOS  = document.getElementById('nexus-os');
    const bootScreen = this.bootScreen;

    // Remove skip listener
    document.removeEventListener('keydown', this._skipBound);
    document.removeEventListener('click',   this._skipBound);

    // Show main OS
    if (nexusOS) {
      nexusOS.removeAttribute('aria-hidden');
      nexusOS.classList.add('visible');
    }

    // Allow body scrolling
    document.body.classList.remove('os-booting');
    document.body.classList.add('boot-complete');
    document.body.style.overflow = '';

    // Start main particle system
    if (window.mainParticles) {
      window.mainParticles.start();
    }

    // Show nav
    const nav = document.getElementById('nexus-nav');
    if (nav) {
      setTimeout(() => nav.classList.add('nav-visible'), 200);
    }

    // Dispatch boot complete event
    window.dispatchEvent(new CustomEvent('nexus:boot-complete'));

    // Remove boot screen from DOM after transition
    setTimeout(() => {
      if (bootScreen) {
        bootScreen.style.display = 'none';
        if (window.bootParticles) window.bootParticles.stop();
      }
    }, 1200);
  }

  // ──────────────────────────────────────────────────────
  //  Skip handler
  // ──────────────────────────────────────────────────────

  skip(e) {
    // Only allow skip after 1 second
    if (e.type === 'keydown' && e.key !== 'Escape' && e.key !== 'Enter') return;
    if (this.hasCompleted) return;

    // Quick finalize
    if (this.bootScreen) {
      this.bootScreen.style.transition = 'opacity 0.4s ease';
      this.bootScreen.style.opacity    = '0';
    }
    setTimeout(() => this.finalize(), 400);
  }

  // ──────────────────────────────────────────────────────
  //  MAIN BOOT SEQUENCE RUN
  // ──────────────────────────────────────────────────────

  async run() {
    // Set timestamp
    this.setTimestamp();

    // Allow skipping after 1 second
    setTimeout(() => {
      document.addEventListener('keydown', this._skipBound);
      document.addEventListener('click',   this._skipBound);
    }, 1000);

    // Wait for reactor power-up animation (CSS handles it: 0.3s delay + 1s duration)
    await this.delay(1500);

    // Run through all boot messages
    for (const msg of this.MESSAGES) {
      await this.delay(msg.delay);

      // Type line (don't await — let it type while progress updates)
      const linePromise = this.addLine(msg.text, msg.type);

      // Animate progress simultaneously
      this.setProgress(msg.progress, 350);

      // Wait for line to finish typing before next
      await linePromise;
    }

    // Final delay
    await this.delay(500);

    // "System Ready" final line
    this.setProgress(100, 400);
    await this.delay(200);
    await this.addLine('System Ready', 'success', '[ ✓ ]');

    await this.delay(600);

    // Swap terminal for access panel
    const terminalArea = document.getElementById('boot-terminal');
    const progressArea = document.getElementById('boot-progress-wrap');

    if (terminalArea) {
      terminalArea.style.transition = 'opacity 0.4s ease';
      terminalArea.style.opacity = '0';
    }
    if (progressArea) {
      progressArea.style.transition = 'opacity 0.4s ease';
      progressArea.style.opacity = '0';
    }
    const osLabel = document.getElementById('boot-os-label');
    if (osLabel) {
      osLabel.style.transition = 'opacity 0.4s ease';
      osLabel.style.opacity = '0';
    }
    const reactorEl = document.getElementById('arc-reactor');
    if (reactorEl) {
      reactorEl.style.transition = 'transform 0.5s ease, opacity 0.4s ease';
      reactorEl.style.transform = 'translate(-50%, -50%) scale(0.6)';
    }

    await this.delay(500);

    // Show the grand access panel
    await this.showAccessPanel();
  }
}

// Auto-run when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const boot = new BootSequence();
  window.nexusBoot = boot;
  boot.run();
});
