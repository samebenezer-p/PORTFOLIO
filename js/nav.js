/* ================================================================
   NEXUS OS — Navigation Controller
   Scroll behavior, active states, clock, mobile drawer
   ================================================================ */

class NexusNav {
  constructor() {
    this.nav        = document.getElementById('nexus-nav');
    this.hamburger  = document.getElementById('nav-hamburger');
    this.drawer     = document.getElementById('nav-mobile-drawer');
    this.clock      = document.getElementById('ns-clock');
    this.navLinks   = document.querySelectorAll('.nav-link');
    this.drawerLinks = document.querySelectorAll('.drawer-link');

    this.sections      = [];
    this.isDrawerOpen  = false;
    this.lastScrollY   = 0;
    this.clockInterval = null;

    // Initialize after boot
    window.addEventListener('nexus:boot-complete', () => this.init());
  }

  init() {
    this.setupClock();
    this.setupScroll();
    this.setupHamburger();
    this.setupSmoothScroll();
    this.gatherSections();
    this.updateActiveLink();
  }

  // ──────────────────────────────────────────────────────
  //  Live Clock
  // ──────────────────────────────────────────────────────

  setupClock() {
    this.updateClock();
    this.clockInterval = setInterval(() => this.updateClock(), 1000);
  }

  updateClock() {
    if (!this.clock) return;
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    this.clock.textContent = `${h}:${m}:${s}`;
  }

  // ──────────────────────────────────────────────────────
  //  Scroll behavior
  // ──────────────────────────────────────────────────────

  setupScroll() {
    window.addEventListener('scroll', () => this.onScroll(), { passive: true });
  }

  onScroll() {
    const scrollY = window.scrollY;

    // Scrolled state
    if (scrollY > 80) {
      this.nav?.classList.add('nav-scrolled');
    } else {
      this.nav?.classList.remove('nav-scrolled');
    }

    this.lastScrollY = scrollY;
    this.updateActiveLink();
  }

  // ──────────────────────────────────────────────────────
  //  Active section tracking
  // ──────────────────────────────────────────────────────

  gatherSections() {
    const sectionIds = ['hero', 'about', 'tech', 'projects', 'experience', 'contact'];
    this.sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean);
  }

  updateActiveLink() {
    const scrollMid = window.scrollY + window.innerHeight / 2;

    let activeSection = null;
    for (const section of this.sections) {
      const { top, bottom } = section.getBoundingClientRect();
      const absTop    = top    + window.scrollY;
      const absBottom = bottom + window.scrollY;

      if (scrollMid >= absTop && scrollMid < absBottom) {
        activeSection = section.id;
        break;
      }
    }

    // Map section id → nav link href
    const hrefMap = {
      hero:       '#hero',
      about:      '#about',
      tech:       '#tech',
      projects:   '#projects',
      experience: '#experience',
      contact:    '#contact',
    };

    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (activeSection && href === hrefMap[activeSection]) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ──────────────────────────────────────────────────────
  //  Mobile Hamburger
  // ──────────────────────────────────────────────────────

  setupHamburger() {
    if (!this.hamburger || !this.drawer) return;

    this.hamburger.addEventListener('click', () => this.toggleDrawer());

    // Close drawer when a link is clicked
    this.drawerLinks.forEach(link => {
      link.addEventListener('click', () => this.closeDrawer());
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (this.isDrawerOpen &&
          !this.drawer.contains(e.target) &&
          !this.hamburger.contains(e.target)) {
        this.closeDrawer();
      }
    });
  }

  toggleDrawer() {
    if (this.isDrawerOpen) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  openDrawer() {
    this.isDrawerOpen = true;
    this.drawer?.classList.add('open');
    this.drawer?.removeAttribute('aria-hidden');
    this.hamburger?.classList.add('active');
    this.hamburger?.setAttribute('aria-expanded', 'true');
  }

  closeDrawer() {
    this.isDrawerOpen = false;
    this.drawer?.classList.remove('open');
    this.drawer?.setAttribute('aria-hidden', 'true');
    this.hamburger?.classList.remove('active');
    this.hamburger?.setAttribute('aria-expanded', 'false');
  }

  // ──────────────────────────────────────────────────────
  //  Smooth Scroll
  // ──────────────────────────────────────────────────────

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }
}

window.nexusNav = new NexusNav();
