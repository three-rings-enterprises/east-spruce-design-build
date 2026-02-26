/* ============================================================
   EAST SPRUCE DESIGN BUILD — HOMEPAGE JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. COPYRIGHT YEAR ─────────────────────────────────────
  const yearEl = document.getElementById('currentYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  // ── 2. ANNOUNCEMENT BAR DISMISS ──────────────────────────
  const dismissBtn = document.getElementById('dismissBar');
  const bar = document.getElementById('announcementBar');
  if (dismissBtn && bar) {
    dismissBtn.addEventListener('click', () => {
      bar.classList.add('dismissed');
    });
  }


  // ── 3. STICKY HEADER SCROLL SHADOW ───────────────────────
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }


  // ── 4. MOBILE MENU ────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

  function openMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));


  // ── 5. HERO HEADLINE TEXT CAROUSEL ────────────────────────
  const words = document.querySelectorAll('.carousel-word');
  if (words.length > 1) {
    let current = 0;
    let timer;

    function nextWord() {
      const prev = current;
      current = (current + 1) % words.length;

      words[prev].classList.remove('active');
      words[prev].classList.add('exit');
      setTimeout(() => words[prev].classList.remove('exit'), 700);

      words[current].classList.add('active');
    }

    timer = setInterval(nextWord, 2800);

    // Pause on hover
    const heroLine2 = document.getElementById('heroCarousel');
    if (heroLine2) {
      heroLine2.addEventListener('mouseenter', () => clearInterval(timer));
      heroLine2.addEventListener('mouseleave', () => {
        timer = setInterval(nextWord, 2800);
      });
    }
  }


  // ── 6. WHY CHOOSE ESDB — ACCORDION ──────────────────────
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      accordionItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Open first item by default
  if (accordionItems.length > 0) {
    accordionItems[0].classList.add('open');
    accordionItems[0].querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'true');
  }


  // ── 7. FORM SUBMISSIONS (basic handling) ─────────────────
  function handleForm(formId, successMessage) {
    const form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = '✓ ' + successMessage;
        btn.disabled = true;
        btn.style.background = '#2a9d8f';
      }
      form.querySelectorAll('input').forEach(input => {
        input.value = '';
        input.disabled = true;
      });
    });
  }

  handleForm('waitlistForm', "You're on the list!");
  handleForm('footerNewsletterForm', 'Subscribed!');


  // ── 8. SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    });
  });


  // ── 9. SCROLL-REVEAL ANIMATION (Intersection Observer) ───
  const revealEls = document.querySelectorAll(
    '.process-card, .portfolio-card, .shop-card, .brand-statement-inner, .accordion-item'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
    revealObserver.observe(el);
  });

  // Add .revealed styles via JS (avoids CSS flash)
  const revealStyle = document.createElement('style');
  revealStyle.textContent = '.revealed { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(revealStyle);

});
