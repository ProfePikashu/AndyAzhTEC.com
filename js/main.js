/* ════════════════════════════════════════════════════════
   AndyAzhTEC.com — main.js
   Beta v0.1.0
════════════════════════════════════════════════════════ */

"use strict";

// ── THEME TOGGLE ──────────────────────────────────────
(function initThemeToggle() {
  const STORAGE_KEY = "aat_theme";
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;

    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    const icon = btn.querySelector("i");
    if (icon) {
      icon.className = theme === "light"
        ? "fa-solid fa-sun"
        : "fa-solid fa-moon";
    }

    btn.setAttribute(
      "aria-label",
      theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"
    );
  }

  function init() {
    applyTheme(getPreferredTheme());

    const btn = document.getElementById("themeToggle");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";

      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);

      if (window.AAT_ANALYTICS && typeof window.AAT_ANALYTICS.track === "function") {
        window.AAT_ANALYTICS.track("click", "theme_toggle", { theme: next });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


// ── PARTICLES ─────────────────────────────────────────
(function initParticles() {
  const container = document.getElementById('particles-bg');
  if (!container) return;
  const COUNT = 90;
  for (let i = 0; i < COUNT; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    const dur  = (Math.random() * 5 + 3).toFixed(2);
    const op   = (Math.random() * 0.6 + 0.2).toFixed(2);
    const delay = (Math.random() * 8).toFixed(2);
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --dur: ${dur}s;
      --op: ${op};
      animation-delay: ${delay}s;
    `;
    container.appendChild(star);
  }
})();

// ── NAVBAR SCROLL ──────────────────────────────────────
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// ── HAMBURGER MENU ─────────────────────────────────────
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });
  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
})();

// ── SCROLL-REVEAL CARDS + STORE AD ────────────────────
(function initScrollReveal() {
  const cards  = document.querySelectorAll('.card');
  const storeAd = document.getElementById('storeAdCard');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el    = entry.target;
        const delay = parseInt(el.dataset.delay || 0);
        setTimeout(() => el.classList.add('visible'), delay);
        revealObserver.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach(card => revealObserver.observe(card));
  if (storeAd) revealObserver.observe(storeAd);
})();

// ── ANIMATED COUNTERS ──────────────────────────────────
(function initCounters() {
  const elements = document.querySelectorAll('.stat-num[data-target]');
  if (!elements.length) return;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target);
    const duration = 1800;
    const start    = performance.now();

    function tick(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.round(easeOut(progress) * target);
      el.textContent = value.toLocaleString('es-AR');
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  elements.forEach(el => observer.observe(el));
})();

// Cart y store filters removidos — ahora viven en js/store.js

// ── FAQ ACCORDION ──────────────────────────────────────
(function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      items.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ── SMOOTH ACTIVE NAV HIGHLIGHT ────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--cyan)'
            : '';
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-60px 0px -60px 0px' });

  sections.forEach(s => observer.observe(s));
})();

// ── NEON CURSOR TRAIL ──────────────────────────────────
(function initCursorTrail() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on mobile/touch
  const TRAIL = 8;
  const dots  = [];

  for (let i = 0; i < TRAIL; i++) {
    const d = document.createElement('div');
    d.style.cssText = `
      position:fixed;pointer-events:none;z-index:9999;border-radius:50%;
      width:${8 - i}px;height:${8 - i}px;
      background:hsl(${270 + i * 10},90%,${70 - i * 4}%);
      opacity:${(TRAIL - i) / TRAIL * 0.7};
      transition:transform 0.1s;
      transform:translate(-50%,-50%);
      top:-20px;left:-20px;
    `;
    document.body.appendChild(d);
    dots.push({ el: d, x: -20, y: -20 });
  }

  let mx = -20, my = -20;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  let leader = { x: mx, y: my };
  function frame() {
    leader.x += (mx - leader.x) * 0.25;
    leader.y += (my - leader.y) * 0.25;
    dots[0].x = leader.x; dots[0].y = leader.y;

    for (let i = 1; i < TRAIL; i++) {
      dots[i].x += (dots[i-1].x - dots[i].x) * 0.4;
      dots[i].y += (dots[i-1].y - dots[i].y) * 0.4;
    }
    dots.forEach(d => {
      d.el.style.left = d.x + 'px';
      d.el.style.top  = d.y + 'px';
    });
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// ── VIDEO SHOWCASE ─────────────────────────────────────
const VideoShowcase = (function () {

  const overlay  = () => document.getElementById('videoPortalOverlay');
  const portal   = () => document.getElementById('videoPortal');
  const embedEl  = () => document.getElementById('videoPortalEmbed');
  const infoEl   = () => document.getElementById('videoPortalInfo');
  const footerEl = () => document.getElementById('videoPortalFooter');

  let closeTimer = null;
  let currentVideo = null;

  /* ── Escape key handler ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  /* ── Render a single video card ── */
  function renderCard(video, index) {
    const gradients = typeof CARD_GRADIENTS !== 'undefined' ? CARD_GRADIENTS : [];
    const gradient  = gradients[index % gradients.length] || 'linear-gradient(135deg,rgba(168,85,247,0.1),rgba(0,245,255,0.05))';
    const tsReadable = typeof tsToReadable !== 'undefined' ? tsToReadable(video.timestamp) : '0s';
    const isClip = video.type === 'clip';
    const accent  = video.accent || '#a855f7';

    const thumbHTML = video.thumbnail
      ? `<img src="${escCard(video.thumbnail)}" alt="${escCard(video.title)}" loading="lazy" />`
      : `<div class="vc-thumb-placeholder"><i class="fa-solid fa-tv"></i></div>`;

    const tsHTML = !isClip
      ? `<span class="vc-ts"><i class="fa-solid fa-clock"></i> desde ${escCard(tsReadable)}</span>`
      : '';

    const card = document.createElement('div');
    card.className = 'video-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Ver: ${video.title}`);
    card.style.setProperty('--vc-accent', accent);
    card.style.setProperty('--vc-gradient', gradient);

    card.innerHTML = `
      <div class="vc-thumb" style="background:${gradient}">
        ${thumbHTML}
        <div class="vc-play-overlay">
          <div class="vc-play-btn"><i class="fa-solid fa-play"></i></div>
        </div>
        ${tsHTML}
      </div>
      <div class="vc-body">
        <span class="vc-badge">${escCard(video.badge || (isClip ? 'Clip' : 'VOD'))}</span>
        <h4 class="vc-title">${escCard(video.title)}</h4>
        <p class="vc-desc">${escCard(video.description)}</p>
        <div class="vc-footer">
          <span class="vc-type">
            <i class="fa-brands fa-twitch"></i>
            ${isClip ? 'Clip de Twitch' : 'VOD de Twitch'}
          </span>
          <span class="vc-expand-hint">
            <i class="fa-solid fa-expand"></i> Ver en grande
          </span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => open(video));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(video); }
    });

    return card;
  }

  /* ── Open the portal lightbox ── */
  function open(video) {
    clearTimeout(closeTimer);
    currentVideo = video;

    const tsReadable = typeof tsToReadable !== 'undefined' ? tsToReadable(video.timestamp) : '0s';
    const isClip     = video.type === 'clip';
    const accent     = video.accent || '#a855f7';

    // Info panel
    const info = infoEl();
    if (info) {
      info.innerHTML = `
        <span class="vpi-badge" style="color:${accent};background:color-mix(in srgb,${accent} 15%,transparent);border-color:color-mix(in srgb,${accent} 40%,transparent)">
          ${escCard(video.badge || (isClip ? 'Clip' : 'VOD'))}
        </span>
        <h3 class="vpi-title">${escCard(video.title)}</h3>
        <p class="vpi-desc">${escCard(video.description)}</p>
      `;
    }

    // Embed iframe
    const embed = embedEl();
    if (embed) {
      const src = typeof getTwitchEmbedURL !== 'undefined' ? getTwitchEmbedURL(video) : '#';
      embed.innerHTML = `<iframe
        src="${src}"
        allowfullscreen
        allow="autoplay; fullscreen"
        title="${escCard(video.title)}"
      ></iframe>`;
    }

    // Footer
    const footer = footerEl();
    if (footer) {
      const channelURL = typeof getTwitchChannelURL !== 'undefined' ? getTwitchChannelURL() : '#';
      footer.innerHTML = `
        <div class="vpf-ts">
          <i class="fa-solid fa-clock"></i>
          ${isClip ? 'Clip — sin timestamp' : `Comienza en <span>${escCard(tsReadable)}</span>`}
        </div>
        <a href="${channelURL}" target="_blank" rel="noopener" class="btn btn-twitch" style="padding:0.4rem 1rem;font-size:0.8rem">
          <i class="fa-brands fa-twitch"></i> Ver canal en vivo
        </a>
      `;
    }

    // Set accent on portal
    const p = portal();
    if (p) {
      p.style.setProperty('--vp-accent', accent);
      p.style.borderColor = `color-mix(in srgb, ${accent} 60%, transparent)`;
    }

    // Animate open
    requestAnimationFrame(() => {
      overlay()?.classList.add('open');
      portal()?.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  /* ── Close the portal ── */
  function close() {
    overlay()?.classList.remove('open');
    portal()?.classList.remove('open');
    document.body.style.overflow = '';

    // Destroy iframe after animation to stop audio
    closeTimer = setTimeout(() => {
      const embed = embedEl();
      if (embed) embed.innerHTML = '';
      currentVideo = null;
    }, 450);
  }

  /* ── Escape HTML for insertion ── */
  function escCard(s) {
    if (typeof s !== 'string') return '';
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* ── Init: render all cards from config ── */
  function init() {
    const grid = document.getElementById('videoCardsGrid');
    if (!grid) return;

    if (typeof AYRPC_VIDEOS === 'undefined' || !AYRPC_VIDEOS.length) {
      grid.innerHTML = `
        <div style="color:var(--text-muted);font-size:0.9rem;grid-column:1/-1;text-align:center;padding:3rem">
          <i class="fa-solid fa-video-slash fa-2x" style="margin-bottom:0.75rem;display:block"></i>
          Aún no hay videos configurados. Editá <code>js/video-config.js</code> para agregar los tuyos.
        </div>`;
      return;
    }

    const fragment = document.createDocumentFragment();
    AYRPC_VIDEOS.forEach((v, i) => fragment.appendChild(renderCard(v, i)));
    grid.appendChild(fragment);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { open, close };
})();

/* ── ANDYAZHTEC TOOLS GRID ───────────────────────────── */
(function initToolsGrid() {
  function esc(s) {
    if (typeof s !== "string") return "";
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderToolCard(tool, index) {
    const card = document.createElement("div");
    card.className = "card card-glow tool-card";
    card.dataset.delay = String(index * 90);

    const isSoon = tool.statusType === "soon";
    const href = isSoon ? "#" : tool.url;

    card.innerHTML = `
      <div class="card-icon"><i class="${esc(tool.icon)}"></i></div>
      <div class="tool-status tool-status--${esc(tool.statusType)}">${esc(tool.status)}</div>
      <h3>${esc(tool.title)}</h3>
      <p>${esc(tool.description)}</p>
      <a href="${esc(href)}"
         class="tool-link ${isSoon ? "tool-link--disabled" : ""}"
         ${isSoon ? 'aria-disabled="true"' : 'target="_blank" rel="noopener"'}
         data-track="tool_${esc(tool.title.toLowerCase().replace(/\s+/g, "_"))}">
        ${esc(tool.cta)} <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    `;

    return card;
  }

  function init() {
    const grid = document.getElementById("toolsGrid");
    if (!grid) return;

    if (typeof AAT_TOOLS === "undefined" || !Array.isArray(AAT_TOOLS) || !AAT_TOOLS.length) {
      grid.innerHTML = `
        <div style="color:var(--text-muted);font-size:0.9rem;grid-column:1/-1;text-align:center;padding:3rem">
          <i class="fa-solid fa-screwdriver-wrench fa-2x" style="margin-bottom:0.75rem;display:block"></i>
          Aún no hay herramientas configuradas.
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();
    const cards = [];

    AAT_TOOLS.forEach((tool, index) => {
      const card = renderToolCard(tool, index);
      cards.push(card);
      fragment.appendChild(card);
    });

    grid.appendChild(fragment);

    cards.forEach((card, index) => {
      setTimeout(() => card.classList.add("visible"), index * 90);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
