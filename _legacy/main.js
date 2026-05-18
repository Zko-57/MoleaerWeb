document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     0. LOGO MOLEAER — Adaptación cromática al dark theme
     Reprocesa el PNG oficial pixel a pixel:
       · fondo blanco/claro  → transparente
       · texto navy oscuro   → cyan luminoso
       · sphere azul medio   → cyan saturado (preserva volumen 3D)
     Resultado: el logo oficial integrado en la paleta aqua sin
     necesidad de blend-modes ni filtros agresivos.
     ========================================================= */
  function processBrandLogo(img) {
    const canvas = document.createElement('canvas');
    const w = img.naturalWidth, h = img.naturalHeight;
    if (!w || !h) return;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    try {
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, w, h);
      const px = data.data;

      for (let i = 0; i < px.length; i += 4) {
        const r = px[i], g = px[i + 1], b = px[i + 2];
        const lum = (r * 0.299 + g * 0.587 + b * 0.114);

        // Fondo blanco → totalmente transparente
        if (lum > 240 && Math.abs(r - g) < 12 && Math.abs(g - b) < 12) {
          px[i + 3] = 0;
          continue;
        }
        // Casi-blanco (anti-aliasing) → alpha proporcional
        if (lum > 215 && Math.abs(r - g) < 18 && Math.abs(g - b) < 18) {
          px[i + 3] = Math.max(0, 255 - Math.round((lum - 215) * 9));
        }

        // Recolorea: texto navy oscuro → cyan claro / blanco
        if (lum < 110 && b >= r) {
          // intensidad inversa: cuanto más oscuro el original, más blanco brillante
          const t = 1 - lum / 110;
          px[i]     = Math.round(170 + 70 * t);   // R 170-240
          px[i + 1] = Math.round(225 + 30 * t);   // G 225-255
          px[i + 2] = 255;                         // B full
        }
        // Tonos medios azules (sphere) → realza cyan
        else if (b > r + 10 && b > 90) {
          px[i]     = Math.round(r * 0.55);
          px[i + 1] = Math.min(255, Math.round(g * 1.18 + 20));
          px[i + 2] = Math.min(255, Math.round(b * 1.06 + 10));
        }
      }

      ctx.putImageData(data, 0, 0);
      img.src = canvas.toDataURL('image/png');
    } catch (e) {
      // Si falla (CORS, etc.) deja la imagen original visible
      console.warn('Logo processing fallback:', e);
    }
    img.classList.add('ready');
  }

  const scheduleLogo = (fn) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(fn, { timeout: 1200 });
    } else {
      setTimeout(fn, 1);
    }
  };

  document.querySelectorAll('img.brand-logo').forEach(img => {
    const run = () => {
      if (img.complete && img.naturalWidth) {
        processBrandLogo(img);
      } else {
        img.addEventListener('load', () => processBrandLogo(img), { once: true });
        img.addEventListener('error', () => img.classList.add('ready'), { once: true });
      }
    };
    scheduleLogo(run);
  });

  /* =========================================================
     1. NANOBURBUJAS — Capa decorativa CSS (rise infinito)
     ========================================================= */
  const particlesContainer = document.getElementById('particles-container');
  // Detecta dispositivos modestos para reducir carga
  const isLowEnd = window.matchMedia('(max-width: 900px)').matches
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

  const BUBBLE_COUNT = isLowEnd ? 18 : 32;

  function createNanoBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('nano-bubble');

    const size = Math.random() * 14 + 2;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}vw`;

    const duration = Math.random() * 22 + 14;
    bubble.style.animationDuration = `${duration}s`;
    bubble.style.animationDelay = `-${Math.random() * 22}s`;

    particlesContainer.appendChild(bubble);

    bubble.addEventListener('animationend', () => {
      bubble.remove();
      createNanoBubble();
    });
  }
  if (particlesContainer) {
    for (let i = 0; i < BUBBLE_COUNT; i++) createNanoBubble();
  }


  /* =========================================================
     2. CANVAS NANOBURBUJAS INTERACTIVO (capa reactiva al ratón)
     Se desactiva en dispositivos modestos para no saturar GPU.
     ========================================================= */
  const canvas = document.getElementById('bubble-canvas');
  if (canvas && !isLowEnd) {
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // limita pixel ratio
    let width, height;
    const bubbles = [];
    const mouse = { x: -9999, y: -9999 };
    let visible = true;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // mousemove throttled vía rAF
    let pendingMouse = null;
    window.addEventListener('mousemove', (e) => {
      pendingMouse = { x: e.clientX, y: e.clientY };
    }, { passive: true });

    // Pausa el canvas cuando la pestaña no está visible
    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden;
      if (visible) requestAnimationFrame(animate);
    });

    class Bubble {
      constructor() { this.reset(true); }
      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + 30;
        this.r = Math.random() * 3 + 1;
        this.vy = -(Math.random() * 0.4 + 0.15);
        this.vx = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.hue = 190 + Math.random() * 20;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist2 = dx * dx + dy * dy; // sin sqrt para abaratar
        if (dist2 < 10000) {
          const dist = Math.sqrt(dist2);
          const force = (100 - dist) / 100;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }
        if (this.y < -20) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.fillStyle = `hsla(${this.hue}, 88%, 68%, ${this.opacity})`;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Mitad de partículas que antes (60 vs 120) y limita por ancho
    const COUNT = Math.min(48, Math.floor(width / 24));
    for (let i = 0; i < COUNT; i++) bubbles.push(new Bubble());

    function animate() {
      if (!visible) return;
      if (pendingMouse) { mouse.x = pendingMouse.x; mouse.y = pendingMouse.y; pendingMouse = null; }
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].update();
        bubbles[i].draw();
      }
      requestAnimationFrame(animate);
    }
    animate();
  }


  /* =========================================================
     3. SCROLL REVEAL — Intersection Observer
     ========================================================= */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));


  /* =========================================================
     3b. SCROLL-SPY — Marca el link de la sección visible
         (se sincroniza con el subrayado cyan del navbar)
     ========================================================= */
  const spyLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
  const sectionMap = new Map();
  spyLinks.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const sec = id && document.getElementById(id);
    if (sec) sectionMap.set(sec, link);
  });

  /* Bloqueo del spy durante el smooth-scroll por clic.
     Cuando el usuario pulsa un link, fijamos la barra en el destino
     y silenciamos el observer para que no "salte" por las secciones
     intermedias mientras la página se desplaza. */
  let spySuppressUntil = 0;
  const setActiveLink = (link) => {
    spyLinks.forEach(l => l.classList.toggle('is-active', l === link));
  };

  if (sectionMap.size) {
    const spyObserver = new IntersectionObserver((entries) => {
      if (performance.now() < spySuppressUntil) return;
      entries.forEach(entry => {
        const link = sectionMap.get(entry.target);
        if (!link) return;
        if (entry.isIntersecting) setActiveLink(link);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sectionMap.forEach((_link, sec) => spyObserver.observe(sec));

    // Click en un link del navbar → activa destino y silencia spy
    spyLinks.forEach(link => {
      link.addEventListener('click', () => {
        setActiveLink(link);
        // Margen amplio: el smooth-scroll dura ~600-900ms según distancia
        spySuppressUntil = performance.now() + 1100;
      });
    });
  }


  /* =========================================================
     4. CONTADORES ANIMADOS — Empieza al entrar en viewport
     ========================================================= */
  const counters = document.querySelectorAll('[data-target]');

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;

      let formatted;
      if (target >= 1000) {
        formatted = Math.floor(value).toLocaleString('es-ES');
      } else if (Number.isInteger(target)) {
        formatted = Math.floor(value);
      } else {
        formatted = value.toFixed(1);
      }
      el.textContent = formatted + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));


  /* =========================================================
     5. SMOOTH SCROLL
     ========================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const yOffset = -100;
        const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });


  /* =========================================================
     6. PARALLAX 3D EN GLASS PANELS (solo desktop)
     ========================================================= */
  const glassPanels = document.querySelectorAll('.bento-item, .kpi-card, .industry-card');

  glassPanels.forEach(panel => {
    let glassRaf = 0;
    let glassEv = null;

    const applyTilt = () => {
      glassRaf = 0;
      const e = glassEv;
      if (!e || window.innerWidth < 1024) return;
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;
      panel.style.transform =
        `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(0, -4px, 0)`;
    };

    panel.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 1024) return;
      glassEv = e;
      if (!glassRaf) glassRaf = requestAnimationFrame(applyTilt);
    }, { passive: true });

    panel.addEventListener('mouseleave', () => {
      glassEv = null;
      if (glassRaf) cancelAnimationFrame(glassRaf);
      glassRaf = 0;
      panel.style.transform = '';
    });
  });


  /* =========================================================
     7. NAVBAR DINÁMICO
     ========================================================= */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let scrollRaf = 0;
    const onScrollNav = () => {
      scrollRaf = 0;
      const y = window.scrollY;
      navbar.classList.toggle('scrolled', y > 50);
    };
    window.addEventListener('scroll', () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(onScrollNav);
    }, { passive: true });
  }


  /* =========================================================
     8. TESTIMONIAL CAROUSEL
     ========================================================= */
  const track = document.querySelector('.testimonial-track');
  if (track) {
    const cards = track.querySelectorAll('.testimonial-card');
    const buttons = document.querySelectorAll('.car-btn');
    let index = 0;

    function visibleCount() {
      if (window.innerWidth < 720) return 1;
      if (window.innerWidth < 1100) return 2;
      return 3;
    }

    function update() {
      const v = visibleCount();
      const maxIndex = Math.max(0, cards.length - v);
      index = Math.min(Math.max(index, 0), maxIndex);
      const card = cards[0];
      const cardWidth = card.getBoundingClientRect().width;
      const gap = 24;
      track.style.transform = `translateX(-${index * (cardWidth + gap)}px)`;
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const dir = parseInt(btn.dataset.dir, 10);
        index += dir;
        update();
      });
    });
    let resizeT = 0;
    const scheduleResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(update, 120);
    };
    window.addEventListener('resize', scheduleResize, { passive: true });
    update();

    // Auto-play opcional
    let autoplay = setInterval(() => {
      const v = visibleCount();
      const maxIndex = cards.length - v;
      index = index >= maxIndex ? 0 : index + 1;
      update();
    }, 5500);

    track.parentElement.addEventListener('mouseenter', () => clearInterval(autoplay));
  }


  /* =========================================================
     9. MENÚ MÓVIL
     ========================================================= */
  const burger = document.querySelector('.nav-burger');
  const navLinks = document.querySelector('.nav-links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
    }));
  }


  /* =========================================================
     9b. NUBE DE NANOBURBUJAS — Distribución + repulsión cursor
     ========================================================= */
  document.querySelectorAll('.nano-cloud[data-bubble-count]').forEach(cloud => {
    const count = parseInt(cloud.dataset.bubbleCount, 10) || 60;
    const frag = document.createDocumentFragment();
    const bubbles = []; // { wrap, x%, y% }

    const cols = Math.ceil(Math.sqrt(count * 2.2));
    const rows = Math.ceil(count / cols);
    let placed = 0;

    for (let r = 0; r < rows && placed < count; r++) {
      for (let c = 0; c < cols && placed < count; c++) {
        const wrap = document.createElement('span');
        wrap.className = 'nano-wrap';

        const dot = document.createElement('span');
        dot.className = 'nano-dot';

        const baseX = ((c + 0.5) / cols) * 100;
        const baseY = ((r + 0.5) / rows) * 100;
        const jitterX = (Math.random() - 0.5) * (70 / cols);
        const jitterY = (Math.random() - 0.5) * (70 / rows);
        const x = Math.max(2, Math.min(98, baseX + jitterX));
        const y = Math.max(4, Math.min(96, baseY + jitterY));

        const sizeRoll = Math.random();
        let size;
        if (sizeRoll < 0.55)      size = 3 + Math.random() * 2;
        else if (sizeRoll < 0.88) size = 5 + Math.random() * 2;
        else                       size = 7 + Math.random() * 3;

        wrap.style.left = x + '%';
        wrap.style.top  = y + '%';
        dot.style.width  = size + 'px';
        dot.style.height = size + 'px';
        dot.style.animationDelay    = (-Math.random() * 5) + 's';
        dot.style.animationDuration = (4 + Math.random() * 3) + 's';
        if (size > 7) dot.style.boxShadow = '0 0 10px rgba(0, 180, 216, 0.95)';

        wrap.appendChild(dot);
        frag.appendChild(wrap);
        bubbles.push({ wrap, xPct: x, yPct: y });
        placed++;
      }
    }
    cloud.appendChild(frag);

    // ---- Repulsión del cursor ----
    let rect = null;
    let mouseX = -9999, mouseY = -9999;
    let rafScheduled = false;
    let hovering = false;

    const REPEL_RADIUS = 90; // px
    const REPEL_STRENGTH = 55; // px máx de desplazamiento

    function updatePositions() {
      rafScheduled = false;
      if (!rect) return;
      const W = rect.width, H = rect.height;

      bubbles.forEach(b => {
        const bx = (b.xPct / 100) * W;
        const by = (b.yPct / 100) * H;
        const dx = bx - mouseX;
        const dy = by - mouseY;
        const dist = Math.hypot(dx, dy);

        if (hovering && dist < REPEL_RADIUS && dist > 0.1) {
          const t = (REPEL_RADIUS - dist) / REPEL_RADIUS;
          const force = t * t * REPEL_STRENGTH;
          const ox = (dx / dist) * force;
          const oy = (dy / dist) * force;
          b.wrap.style.transform = `translate3d(${ox.toFixed(1)}px,${oy.toFixed(1)}px,0)`;
        } else {
          b.wrap.style.transform = '';
        }
      });
    }

    function scheduleUpdate() {
      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(updatePositions);
      }
    }

    cloud.addEventListener('mouseenter', () => {
      hovering = true;
      rect = cloud.getBoundingClientRect();
    });
    cloud.addEventListener('mousemove', (e) => {
      if (!rect) rect = cloud.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      scheduleUpdate();
    });
    cloud.addEventListener('mouseleave', () => {
      hovering = false;
      mouseX = -9999;
      mouseY = -9999;
      scheduleUpdate();
    });

    // Recalibrar rect al hacer scroll/resize
    window.addEventListener('scroll', () => { rect = null; }, { passive: true });
    window.addEventListener('resize', () => { rect = null; });
  });


  /* =========================================================
     10. BURBUJAS EXPLOSIVAS — Hover para "pop"
     ========================================================= */
  const bubbleContainer = document.querySelector('.compare-bad .compare-visual');
  if (bubbleContainer) {
    const initial = bubbleContainer.querySelectorAll('.big-bubble');
    initial.forEach(wireBubble);
  }

  function wireBubble(bubble) {
    bubble.addEventListener('mouseenter', () => popBubble(bubble), { once: true });
  }

  function popBubble(bubble) {
    const parent = bubble.parentElement;
    const rect = bubble.getBoundingClientRect();
    const parentRect = parent.getBoundingClientRect();
    const localLeft = rect.left - parentRect.left;
    const localTop  = rect.top  - parentRect.top;
    const cx = localLeft + rect.width / 2;
    const cy = localTop  + rect.height / 2;

    // Congelar la burbuja en su posición actual y reemplazar la animación
    bubble.style.left   = localLeft + 'px';
    bubble.style.top    = localTop  + 'px';
    bubble.style.bottom = 'auto';
    bubble.style.animation = 'pop-bubble 0.35s ease-out forwards';

    // Pocas gotitas finas
    const dropletCount = 5;
    for (let i = 0; i < dropletCount; i++) {
      const d = document.createElement('div');
      d.className = 'pop-droplet';
      d.style.left = cx + 'px';
      d.style.top  = cy + 'px';
      const baseAngle = (i / dropletCount) * Math.PI * 2;
      const jitter = (Math.random() - 0.5) * 0.5;
      const angle = baseAngle + jitter;
      const dist  = 15 + Math.random() * 18;
      const size  = 2 + Math.random() * 2;
      d.style.width  = size + 'px';
      d.style.height = size + 'px';
      d.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      d.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      parent.appendChild(d);
      d.addEventListener('animationend', () => d.remove(), { once: true });
    }

    // Cuando termina el pop, eliminar y respawn
    bubble.addEventListener('animationend', () => {
      const replacement = document.createElement('div');
      // Mantener la misma clase de tamaño (bb-1/bb-2/bb-3) para variedad consistente
      const sizeClass = ['bb-1', 'bb-2', 'bb-3'].find(c => bubble.classList.contains(c)) || 'bb-2';
      replacement.className = 'big-bubble ' + sizeClass;
      // Variar la posición horizontal para que no aparezca exactamente igual
      const newLeftPct = 15 + Math.random() * 70;
      replacement.style.left = newLeftPct + '%';
      // Pequeño delay para que entre con calma
      replacement.style.animationDelay = '-0.3s';
      parent.appendChild(replacement);
      wireBubble(replacement);
      bubble.remove();
    }, { once: true });
  }


  /* =========================================================
     11. COMPARATIVA LECHUGA — Zoom interactivo
     ========================================================= */
  const compareVisual = document.querySelector('.comparison-visual');
  if (compareVisual) {
    const focusButtons = compareVisual.querySelectorAll('[data-focus]');
    focusButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const focus = btn.dataset.focus;
        const current = compareVisual.dataset.focus;
        compareVisual.dataset.focus = current === focus ? 'none' : focus;
      });
    });
  }


  /* =========================================================
     11. FAQ — Solo una abierta a la vez
     ========================================================= */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => { if (other !== item) other.open = false; });
      }
    });
  });

});
