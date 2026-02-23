/* ============================================================
   PREMIUM HOSTING & AGENCY — JAVASCRIPT
   Minimal vanilla JS for navigation, scroll animations,
   and interactive UI elements
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile Navigation Toggle ──────────────────────────────
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Navbar Scroll Effect ──────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial state
  }

  // ── Scroll-Triggered Fade-In Animations ────────────────────
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  }

  // ── Active Nav Link Highlighting ──────────────────────────
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a, .dropdown-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace(/^\.\.?\/?/, '').replace(/^\//, ''))) {
      // User request: "page must be highlighted in the drop down but it [the nav link] must not be highlighted"
      if (link.classList.contains('dropdown-item')) {
        link.classList.add('active');
      } else {
        // Only add active to top-level links if they ARE the page and NOT a dropdown trigger
        if (!link.classList.contains('nav-link-trigger')) {
          link.classList.add('active');
        }
      }
    }
  });

  // ── Smooth Scroll for Anchor Links ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── FAQ / Accordion (if present) ──────────────────────────
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Pricing Toggle (Monthly / Annual) if present ──────────
  const pricingToggle = document.querySelector('.pricing-toggle');
  if (pricingToggle) {
    pricingToggle.addEventListener('click', () => {
      pricingToggle.classList.toggle('annual');
      document.querySelectorAll('[data-monthly]').forEach(el => {
        const isAnnual = pricingToggle.classList.contains('annual');
        el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
      });
    });
  }

  // ── Dropdown Toggles (Generic for Multiple Instances) ──────
  const dropdownWrappers = document.querySelectorAll('.dropdown-wrapper, .nav-item.has-dropdown');

  dropdownWrappers.forEach(wrapper => {
    const trigger = wrapper.querySelector('.dropdown-trigger, .nav-link-trigger');

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        // Only prevent default if it's a small screen or has-dropdown
        if (window.innerWidth < 1024 || wrapper.classList.contains('has-dropdown')) {
          e.preventDefault();
        }
        e.stopPropagation();

        // Close other dropdowns
        dropdownWrappers.forEach(w => {
          if (w !== wrapper) w.classList.remove('open');
        });

        wrapper.classList.toggle('open');
      });
    }
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    dropdownWrappers.forEach(wrapper => {
      if (!wrapper.contains(e.target)) {
        wrapper.classList.remove('open');
      }
    });
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      dropdownWrappers.forEach(wrapper => {
        wrapper.classList.remove('open');
      });
    }
  });

  // ── Mock Auth State Toggle (For Testing/Handover) ──────────
  // Toggle with Ctrl + Shift + L
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l')) {
      document.body.classList.toggle('is-logged-in');
      console.log('Auth state toggled. Logged in:', document.body.classList.contains('is-logged-in'));
    }
  });
});
