/**
 * Shared Element Gallery — vanilla JS + GSAP
 * Drop-in replacement for the basic lightbox in all project pages.
 * Requires GSAP to be loaded before this script.
 */
(function () {
  'use strict';

  function initGallery() {
    const galleryImgs = [...document.querySelectorAll('.gallery-grid img, .asset-card img, .renders-grid img, .gallery-masonry img')];
    if (!galleryImgs.length) return;

    const imgSrcs = galleryImgs.map(img => img.src);
    let currentIdx = 0;
    let dragStartY = null;

    /* ── Build overlay DOM ─────────────────────────────────── */
    const overlay = document.createElement('div');
    overlay.id = 'sg-overlay';
    Object.assign(overlay.style, {
      position: 'fixed', inset: '0', zIndex: '2000',
      display: 'none', alignItems: 'center', justifyContent: 'center',
    });

    const backdrop = document.createElement('div');
    Object.assign(backdrop.style, {
      position: 'absolute', inset: '0',
      background: 'rgba(0,0,0,0.88)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
    });

    const expandedImg = document.createElement('img');
    expandedImg.draggable = false;
    Object.assign(expandedImg.style, {
      position: 'relative', zIndex: '1',
      maxWidth: '92vw', maxHeight: '88vh',
      objectFit: 'contain', borderRadius: '14px',
      boxShadow: '0 48px 100px rgba(0,0,0,.65)',
      willChange: 'transform', touchAction: 'none',
      cursor: 'none', userSelect: 'none',
    });

    /* close button */
    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('aria-label', 'Cerrar galería');
    closeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    Object.assign(closeBtn.style, {
      position: 'absolute', top: '24px', right: '24px', zIndex: '3',
      width: '44px', height: '44px', borderRadius: '50%', border: 'none',
      background: 'rgba(255,255,255,.1)', color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(8px)', cursor: 'none', transition: 'background .2s',
    });
    closeBtn.onmouseenter = () => closeBtn.style.background = 'rgba(255,255,255,.22)';
    closeBtn.onmouseleave = () => closeBtn.style.background = 'rgba(255,255,255,.1)';

    /* arrow buttons */
    function makeArrow(dir) {
      const btn = document.createElement('button');
      btn.innerHTML = dir === 'prev'
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>';
      Object.assign(btn.style, {
        position: 'absolute', [dir === 'prev' ? 'left' : 'right']: '24px',
        top: '50%', transform: 'translateY(-50%)', zIndex: '3',
        width: '48px', height: '48px', borderRadius: '50%',
        border: '1px solid rgba(255,255,255,.15)',
        background: 'rgba(255,255,255,.07)', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'none', transition: 'background .2s, border-color .2s',
      });
      btn.onmouseenter = () => { btn.style.background = 'rgba(255,107,53,.18)'; btn.style.borderColor = 'rgba(255,107,53,.5)'; };
      btn.onmouseleave = () => { btn.style.background = 'rgba(255,255,255,.07)'; btn.style.borderColor = 'rgba(255,255,255,.15)'; };
      return btn;
    }
    const prevBtn = makeArrow('prev');
    const nextBtn = makeArrow('next');

    /* counter */
    const counter = document.createElement('p');
    Object.assign(counter.style, {
      position: 'absolute', bottom: '24px', left: '50%',
      transform: 'translateX(-50%)', zIndex: '3',
      fontSize: '11px', letterSpacing: '.2em',
      color: 'rgba(255,255,255,.4)', fontFamily: 'inherit',
    });

    overlay.append(backdrop, expandedImg, closeBtn, prevBtn, nextBtn, counter);
    document.body.appendChild(overlay);

    /* ── Helpers ───────────────────────────────────────────── */
    function updateCounter() {
      counter.textContent = (currentIdx + 1) + ' / ' + imgSrcs.length;
    }

    function open(clickedImg, idx) {
      currentIdx = idx;
      const rect = clickedImg.getBoundingClientRect();

      overlay.style.display = 'flex';
      gsap.set(backdrop, { opacity: 0 });
      gsap.to(backdrop, { opacity: 1, duration: 0.35, ease: 'power2.out' });

      expandedImg.src = imgSrcs[idx];
      updateCounter();

      /* FLIP: animate from thumbnail position to center */
      const vw = window.innerWidth, vh = window.innerHeight;
      const fromX     = rect.left + rect.width  / 2 - vw / 2;
      const fromY     = rect.top  + rect.height / 2 - vh / 2;
      const fromScale = Math.max(rect.width / (vw * 0.92), rect.height / (vh * 0.88)) * 0.85;

      gsap.fromTo(expandedImg,
        { x: fromX, y: fromY, scale: fromScale, opacity: 0.5, borderRadius: '12px' },
        { x: 0, y: 0, scale: 1, opacity: 1, borderRadius: '14px',
          duration: 0.52, ease: 'power4.out' }
      );
      gsap.fromTo(closeBtn,           { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.3, delay: 0.12 });
      gsap.fromTo([prevBtn, nextBtn], { opacity: 0 },         { opacity: 1, duration: 0.3, delay: 0.2 });
      gsap.fromTo(counter,            { opacity: 0 },         { opacity: 1, duration: 0.3, delay: 0.2 });

      document.body.style.overflow = 'hidden';
    }

    function close(offsetY) {
      gsap.to(backdrop, { opacity: 0, duration: 0.28, ease: 'power2.in' });
      gsap.to(expandedImg, {
        scale: 0.86, opacity: 0, y: offsetY || 0,
        duration: 0.3, ease: 'power3.in',
        onComplete: () => {
          overlay.style.display = 'none';
          document.body.style.overflow = '';
        }
      });
      gsap.to([closeBtn, prevBtn, nextBtn, counter], { opacity: 0, duration: 0.2 });
    }

    function navigate(dir) {
      currentIdx = (currentIdx + dir + imgSrcs.length) % imgSrcs.length;
      gsap.to(expandedImg, {
        opacity: 0, x: dir * -50, duration: 0.16, ease: 'power2.in',
        onComplete: () => {
          expandedImg.src = imgSrcs[currentIdx];
          updateCounter();
          gsap.fromTo(expandedImg,
            { opacity: 0, x: dir * 50 },
            { opacity: 1, x: 0, duration: 0.26, ease: 'power2.out' }
          );
        }
      });
    }

    /* ── Events ────────────────────────────────────────────── */
    galleryImgs.forEach((img, i) => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => open(img, i));
    });

    backdrop.addEventListener('click', () => close());
    closeBtn.addEventListener('click', () => close());
    prevBtn.addEventListener('click', e => { e.stopPropagation(); navigate(-1); });
    nextBtn.addEventListener('click', e => { e.stopPropagation(); navigate(1); });

    /* drag-to-dismiss */
    expandedImg.addEventListener('pointerdown', e => {
      dragStartY = e.clientY;
      expandedImg.setPointerCapture(e.pointerId);
    });
    expandedImg.addEventListener('pointermove', e => {
      if (dragStartY === null) return;
      const dy = e.clientY - dragStartY;
      gsap.set(expandedImg, { y: dy, opacity: 1 - Math.abs(dy) / 320 });
    });
    expandedImg.addEventListener('pointerup', e => {
      if (dragStartY === null) return;
      const dy = e.clientY - dragStartY;
      dragStartY = null;
      if (Math.abs(dy) > 90) {
        close(dy);
      } else {
        gsap.to(expandedImg, { y: 0, opacity: 1, duration: 0.35, ease: 'back.out(2.5)' });
      }
    });

    /* keyboard */
    document.addEventListener('keydown', e => {
      if (overlay.style.display === 'none') return;
      if (e.key === 'Escape')      close();
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
