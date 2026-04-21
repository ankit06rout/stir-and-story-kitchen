/* ═══════════════════════════════════════════════════════════════
   STIR & STORY KITCHEN — Main JavaScript
═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Dark Mode Toggle ─── */
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let currentTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', currentTheme);

  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;

  if (toggle) {
    toggle.innerHTML = currentTheme === 'dark' ? sunIcon : moonIcon;
    toggle.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      toggle.innerHTML = currentTheme === 'dark' ? sunIcon : moonIcon;
      toggle.setAttribute('aria-label', `Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  /* ─── Sticky Header ─── */
  const header = document.getElementById('site-header');
  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = y;
  }, { passive: true });

  /* ─── Mobile Nav ─── */
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
      });
    });
  }

  /* ─── Product Gallery Thumbnails ─── */
  const galleryMainImg = document.getElementById('gallery-main-img');
  const thumbs = document.querySelectorAll('.thumb');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.getAttribute('data-img');
      if (galleryMainImg && newSrc) {
        galleryMainImg.src = newSrc;
        thumbs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-pressed', 'false'); });
        thumb.classList.add('active');
        thumb.setAttribute('aria-pressed', 'true');
      }
    });
  });

  /* ─── Gallery Arrow Navigation ─── */
  const thumbsArr = Array.from(document.querySelectorAll('.thumb'));
  let currentIndex = 0;

  function goToIndex(index) {
    currentIndex = (index + thumbsArr.length) % thumbsArr.length;
    const newSrc = thumbsArr[currentIndex].getAttribute('data-img');
    if (galleryMainImg && newSrc) {
      galleryMainImg.src = newSrc;
      thumbsArr.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-pressed', 'false'); });
      thumbsArr[currentIndex].classList.add('active');
      thumbsArr[currentIndex].setAttribute('aria-pressed', 'true');
    }
  }

  document.getElementById('gallery-prev')?.addEventListener('click', () => goToIndex(currentIndex - 1));
  document.getElementById('gallery-next')?.addEventListener('click', () => goToIndex(currentIndex + 1));

  thumbsArr.forEach((thumb, i) => {
    thumb.addEventListener('click', () => { currentIndex = i; });
  });
  /* ─── Variant Selector ─── */
  const variantBtns = document.querySelectorAll('.variant-btn');
  variantBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      variantBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  /* ─── Scroll Reveal Animations ─── */
  const revealEls = document.querySelectorAll('.feature-card, .review-card, .mission-card, .brand-pill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.style.transition = `opacity 0.5s ease ${i * 0.06}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`;
    observer.observe(el);
  });

  /* ─── Smooth scroll for anchor links ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

/* ─── Lightbox ─── */
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.id = 'lightbox';
  lightboxOverlay.innerHTML = '<img id="lightbox-img" src="" alt="" />';
  document.body.appendChild(lightboxOverlay);

  const lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.gallery-main img, .lifestyle-image-col img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('dblclick', () => {
      lightboxImg.src = img.src;
      lightboxOverlay.classList.add('open');
    });
  });

  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
      lightboxOverlay.classList.remove('open');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      lightboxOverlay.classList.remove('open');
    }
  });
});
