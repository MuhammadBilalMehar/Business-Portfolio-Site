/* ===========================================================
   Al Noor Travel & Tours — main script
   Vanilla JS only. Organized by feature.
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     0. WHATSAPP CONFIG
     Update WHATSAPP_NUMBER (international format, no + or 00)
     and the message shown when a visitor taps the button.
     ========================================================= */
  const WHATSAPP_NUMBER = '923040011006'; // e.g. 92 300 1234567 -> 923001234567
  const WHATSAPP_MESSAGE = "Assalam-o-Alaikum! I'm interested in your Umrah/Hajj/travel packages. Could you please share more details?";

  function buildWhatsAppLink() {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  }

  // Wire up every WhatsApp entry point (floating button, CTA button, contact section link)
  const waLink = buildWhatsAppLink();
  ['whatsapp-float', 'cta-whatsapp', 'contact-whatsapp', 'nav-whatsapp'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('href', waLink);
  });

  // Keep a broken remote image from leaving an empty/broken-image icon in the layout.
  // The gradient fallback preserves each card's size and keeps the page polished.
  document.addEventListener('error', (event) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || image.classList.contains('image-fallback')) return;
    image.classList.add('image-fallback');
    image.alt = `${image.alt || 'Travel'} image unavailable`;
    image.removeAttribute('src');
  }, true);


  /* =========================================================
     1. STICKY NAVBAR BEHAVIOR
     ========================================================= */
  const navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);


  /* =========================================================
     2. MOBILE NAVIGATION TOGGLE
     ========================================================= */
  const menuBtn = document.getElementById('menu-btn');
  const closeMenuBtn = document.getElementById('close-menu');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMenu() {
    mobileMenu.classList.add('menu-open');
    menuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    mobileMenu.classList.remove('menu-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  menuBtn.addEventListener('click', openMenu);
  closeMenuBtn.addEventListener('click', closeMenu);
  mobileLinks.forEach((link) => link.addEventListener('click', closeMenu));


  /* =========================================================
     3. SMOOTH SCROLLING (for browsers/edge cases beyond CSS)
     ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 80;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });


  /* =========================================================
     4. SCROLL REVEAL ANIMATIONS
     ========================================================= */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => revealObserver.observe(el));


  /* =========================================================
     5. ANIMATED STATISTICS COUNTERS
     ========================================================= */
  const counters = document.querySelectorAll('.counter');
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach((c) => counterObserver.observe(c));


  /* =========================================================
     6. DESTINATION CARDS (International Tours)
     ========================================================= */
  const destinations = [
    { name: 'Turkey', desc: 'Where East meets West in timeless style.', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop' },
    { name: 'Dubai', desc: 'Skylines, deserts and world-class luxury.', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop' },
    { name: 'Saudi Arabia', desc: 'Ancient heritage meets modern wonder.', img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop' },
    { name: 'Malaysia', desc: 'Tropical escapes and vibrant cities.', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop' },
    { name: 'Azerbaijan', desc: 'A hidden gem between two continents.', img: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=800&auto=format&fit=crop' },
    { name: 'Thailand', desc: 'Beaches, temples and warm hospitality.', img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=800&auto=format&fit=crop' },
    { name: 'Europe', desc: 'Iconic cities and unforgettable scenery.', img: 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=800&auto=format&fit=crop' },
    { name: 'Maldives', desc: 'Overwater villas and turquoise lagoons.', img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800&auto=format&fit=crop' },
  ];

  const destGrid = document.getElementById('destination-grid');
  destGrid.innerHTML = destinations.map((d, i) => `
    <div data-reveal style="transition-delay:${(i % 4) * 90}ms" class="reveal dest-card">
      <img src="${d.img}" alt="${d.name} travel destination" loading="lazy">
      <div class="dest-overlay">
        <h3 class="font-display text-xl font-semibold">${d.name}</h3>
        <p class="text-sm text-white/75">${d.desc}</p>
        <a href="#contact" class="dest-btn inline-flex items-center gap-2 text-gold text-sm font-semibold">
          Explore Destination <i class="fa-solid fa-arrow-right text-xs"></i>
        </a>
      </div>
    </div>
  `).join('');

  // Observe newly injected reveal elements
  destGrid.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));


  /* =========================================================
     7. FEATURED PACKAGES + FILTERING
     ========================================================= */
  const packages = [
    { name: 'Dubai Explorer', category: 'international', duration: '5 Days / 4 Nights', hotel: '4-Star City Hotel', price: 'PKR 149,999', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop' },
    { name: 'Turkey Discovery', category: 'international', duration: '8 Days / 7 Nights', hotel: '5-Star Boutique Hotels', price: 'PKR 249,999', img: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop' },
    { name: 'Malaysia Escape', category: 'international', duration: '6 Days / 5 Nights', hotel: '4-Star Resort', price: 'PKR 179,999', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=800&auto=format&fit=crop' },
    { name: 'Premium Umrah Journey', category: 'umrah', duration: '10 Days / 9 Nights', hotel: 'Haram-View Hotels', price: 'PKR 289,999', img: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop' },
    { name: 'Hunza Valley Retreat', category: 'domestic', duration: '5 Days / 4 Nights', hotel: 'Mountain View Lodge', price: 'PKR 89,999', img: 'https://images.unsplash.com/photo-1626621331169-5f34be280ed9?q=80&w=800&auto=format&fit=crop' },
    { name: 'Maldives Paradise', category: 'international', duration: '4 Days / 3 Nights', hotel: 'Overwater Villa Resort', price: 'PKR 329,999', img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800&auto=format&fit=crop' },
  ];

  const packageGrid = document.getElementById('package-grid');
  function renderPackages() {
    packageGrid.innerHTML = packages.map((p, i) => `
      <div data-reveal style="transition-delay:${(i % 3) * 100}ms" data-category="${p.category}" class="reveal package-card">
        <img src="${p.img}" alt="${p.name} travel package" loading="lazy">
        <div class="p-6 flex flex-col flex-1">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-display text-lg font-semibold">${p.name}</h3>
            <span class="text-[10px] font-semibold uppercase tracking-wide text-gold-dark bg-gold/10 px-2.5 py-1 rounded-full">${p.category}</span>
          </div>
          <div class="flex items-center gap-4 text-xs text-charcoal/60 mb-3">
            <span class="flex items-center gap-1.5"><i class="fa-regular fa-calendar"></i>${p.duration}</span>
            <span class="flex items-center gap-1.5"><i class="fa-solid fa-hotel"></i>${p.hotel}</span>
          </div>
          <p class="text-sm text-charcoal/50 mb-1">Starting From</p>
          <p class="font-display text-xl font-bold text-emerald mb-5">${p.price}</p>
          <div class="mt-auto flex gap-3">
            <a href="#gallery" class="flex-1 text-center text-sm font-semibold border border-emerald/30 text-emerald hover:bg-emerald hover:text-white transition-all py-2.5 rounded-full">View Details</a>
            <a href="#contact" class="flex-1 text-center text-sm font-semibold bg-gold hover:bg-gold-light text-emerald-dark transition-all py-2.5 rounded-full">Get a Quote</a>
          </div>
        </div>
      </div>
    `).join('');
    packageGrid.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));
  }
  renderPackages();

  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      const filter = btn.dataset.filter;
      document.querySelectorAll('#package-grid .package-card').forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden-package', !matches);
      });
    });
  });


  /* =========================================================
     8. TESTIMONIAL SLIDER
     ========================================================= */
  const testimonials = [
    { text: 'The entire Umrah experience was extremely well organized. The team was helpful from the beginning until our return.', name: 'Ahmed R.', rating: 5 },
    { text: 'Excellent service and very professional staff. Our family trip was comfortable and stress-free.', name: 'Muhammad A.', rating: 5 },
    { text: 'Highly recommended for anyone looking for reliable travel and Umrah services.', name: 'Usman K.', rating: 5 },
  ];

  const testiTrack = document.getElementById('testimonial-track');
  const testiDotsWrap = document.getElementById('testi-dots');
  let testiIndex = 0;
  let testiTimer;

  function renderTestimonials() {
    testiTrack.innerHTML = testimonials.map((t, i) => `
      <div class="testi-slide ${i === 0 ? 'active-slide' : ''}">
        <div class="flex justify-center gap-1 text-gold mb-5">
          ${'<i class="fa-solid fa-star"></i>'.repeat(t.rating)}
        </div>
        <p class="font-display text-xl md:text-2xl italic leading-relaxed mb-7">"${t.text}"</p>
        <div class="flex items-center justify-center gap-3">
          <span class="w-10 h-10 rounded-full bg-gold/20 text-gold font-semibold flex items-center justify-center text-sm">${t.name.charAt(0)}</span>
          <span class="text-sm text-white/70">${t.name}</span>
        </div>
      </div>
    `).join('');

    testiDotsWrap.innerHTML = testimonials.map((_, i) => `
      <span class="testi-dot ${i === 0 ? 'active-dot' : ''}" data-index="${i}"></span>
    `).join('');
  }
  renderTestimonials();

  const slides = () => document.querySelectorAll('.testi-slide');
  const dots = () => document.querySelectorAll('.testi-dot');

  function goToSlide(index) {
    testiIndex = (index + testimonials.length) % testimonials.length;
    slides().forEach((s, i) => s.classList.toggle('active-slide', i === testiIndex));
    dots().forEach((d, i) => d.classList.toggle('active-dot', i === testiIndex));
  }

  function startAutoplay() {
    testiTimer = setInterval(() => goToSlide(testiIndex + 1), 5500);
  }
  function resetAutoplay() {
    clearInterval(testiTimer);
    startAutoplay();
  }

  document.getElementById('testi-next').addEventListener('click', () => { goToSlide(testiIndex + 1); resetAutoplay(); });
  document.getElementById('testi-prev').addEventListener('click', () => { goToSlide(testiIndex - 1); resetAutoplay(); });
  testiDotsWrap.addEventListener('click', (e) => {
    if (e.target.classList.contains('testi-dot')) {
      goToSlide(parseInt(e.target.dataset.index, 10));
      resetAutoplay();
    }
  });
  startAutoplay();


  /* =========================================================
     9. GALLERY + LIGHTBOX
     ========================================================= */
  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=900&auto=format&fit=crop', alt: 'The Kaaba, Makkah' },
    { src: 'https://images.unsplash.com/photo-1537444120404-fe9440e2a8c9?q=80&w=900&auto=format&fit=crop', alt: 'Grand Mosque, Makkah' },
    { src: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=900&auto=format&fit=crop', alt: 'Kaaba at dusk' },
    { src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=900&auto=format&fit=crop', alt: 'Dubai skyline' },
    { src: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=900&auto=format&fit=crop', alt: 'Turkey coastline' },
    { src: 'https://images.unsplash.com/photo-1540339832862-474599807836?q=80&w=900&auto=format&fit=crop', alt: 'Airplane wing above clouds' },
    { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=900&auto=format&fit=crop', alt: 'Luxury hotel lobby' },
    { src: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?q=80&w=900&auto=format&fit=crop', alt: 'Family enjoying travel' },
    { src: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=900&auto=format&fit=crop', alt: 'Maldives overwater villas' },
  ];

  const galleryGrid = document.getElementById('gallery-grid');
  galleryGrid.innerHTML = galleryImages.map((g, i) => `
    <div class="gallery-item" data-index="${i}">
      <img src="${g.src}" alt="${g.alt}" loading="lazy">
    </div>
  `).join('');

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  let lightboxIndex = 0;

  function openLightbox(index) {
    lightboxIndex = index;
    updateLightboxImage();
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    document.body.style.overflow = '';
  }
  function updateLightboxImage() {
    const img = galleryImages[lightboxIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  galleryGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (item) openLightbox(parseInt(item.dataset.index, 10));
  });

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-next').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex + 1) % galleryImages.length;
    updateLightboxImage();
  });
  document.getElementById('lightbox-prev').addEventListener('click', () => {
    lightboxIndex = (lightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
  });
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('hidden')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') document.getElementById('lightbox-next').click();
    if (e.key === 'ArrowLeft') document.getElementById('lightbox-prev').click();
  });


  /* =========================================================
     10. FAQ ACCORDION
     ========================================================= */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });


  /* =========================================================
     11. TOAST NOTIFICATIONS
     ========================================================= */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(message, type = 'success') {
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-emerald' : 'fa-circle-exclamation text-red-500'} text-lg mt-0.5"></i>
      <span class="text-sm text-charcoal/80">${message}</span>
    `;
    toast.style.borderColor = type === 'success' ? '#0B3D2E' : '#DC2626';
    toast.classList.add('show-toast');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show-toast'), 4000);
  }


  /* =========================================================
     12. CONTACT FORM VALIDATION
     ========================================================= */
  const form = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success');

  const validators = {
    fullName: (v) => v.trim().length >= 2 || 'Please enter your full name.',
    phone: (v) => /^[0-9+\-\s()]{7,15}$/.test(v.trim()) || 'Please enter a valid phone number.',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Please enter a valid email address.',
    serviceType: (v) => v !== '' || 'Please select a service type.',
    travelDate: (v) => v !== '' || 'Please select a preferred travel date.',
    travelers: (v) => (parseInt(v, 10) > 0) || 'Please enter at least 1 traveler.',
    message: (v) => v.trim().length >= 10 || 'Please add a short message (10+ characters).',
  };

  function validateField(field) {
    const rule = validators[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    const errorEl = field.parentElement.querySelector('.form-error');
    if (result === true) {
      field.classList.remove('input-error');
      if (errorEl) errorEl.textContent = '';
      return true;
    } else {
      field.classList.add('input-error');
      if (errorEl) errorEl.textContent = result;
      return false;
    }
  }

  form.querySelectorAll('.form-input').forEach((field) => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('input-error')) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = Array.from(form.querySelectorAll('.form-input'));
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      showToast('Please fix the highlighted fields before submitting.', 'error');
      return;
    }

    // No backend submission per spec — simulate success only.
    successBox.classList.add('show');
    successBox.classList.remove('hidden');
    showToast('Your quote request has been sent successfully!');
    form.reset();
    fields.forEach((f) => f.classList.remove('input-error'));

    setTimeout(() => {
      successBox.classList.remove('show');
      successBox.classList.add('hidden');
    }, 6000);
  });


  /* =========================================================
     13. BACK TO TOP BUTTON
     ========================================================= */
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    } else {
      backToTop.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
    }
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


  /* =========================================================
     14. ACTIVE NAV LINK ON SCROLL
     ========================================================= */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active-link', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach((s) => sectionObserver.observe(s));

});
