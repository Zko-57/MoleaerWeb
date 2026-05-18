function navOffsetPx() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--nav-offset').trim();
  if (raw.endsWith('rem')) return parseFloat(raw) * 16;
  if (raw.endsWith('px')) return parseFloat(raw);
  return 108;
}

/** Desplaza a un ancla respetando la altura del navbar fijo. */
export function scrollToHash(hash: string, smooth = true) {
  if (hash === '#top' || hash === '') {
    if (typeof history !== 'undefined' && history.replaceState) {
      history.replaceState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'instant' });
    return;
  }

  const el = document.querySelector(hash);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - navOffsetPx();
  window.scrollTo({
    top: Math.max(0, top),
    behavior: smooth ? 'smooth' : 'instant',
  });

  if (typeof history !== 'undefined' && history.replaceState) {
    history.replaceState(null, '', hash);
  }
}
