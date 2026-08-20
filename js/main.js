/* ================================================================
   NEXUS OS — Main Orchestration script
   Initializes and links all modules upon boot complete
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Global settings/actions for debugging
  console.log('%cNEXUS OS v2.0.26 Initialized', 'color: #00D4FF; font-weight: bold; font-size: 14px;');
});

// Once boot completes, init all scroll reveals and page modules
window.addEventListener('nexus:boot-complete', () => {
  // Initialize Counters
  if (window.NumberCounter) {
    window.nexusCounters = new window.NumberCounter();
  }

  // Initialize Scroll Reveals
  if (window.ScrollRevealEngine) {
    window.nexusReveals = new window.ScrollRevealEngine();
  }
});
