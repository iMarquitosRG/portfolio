/**
 * Case study index: stays on screen (sticky) and highlights the section you're reading.
 * Sidebar on desktop, chip bar on tablet and phones.
 */
export function initCaseIndex() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-index-link]')];
  if (!links.length) return;
  const targets = [...document.querySelectorAll<HTMLElement>('[data-index-target]')];
  if (!targets.length) return;
  let current = '';

  const setActive = (id: string) => {
    if (id === current) return;
    current = id;
    links.forEach((l) => {
      const on = l.hash === `#${id}`;
      if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
      if (on && l.closest('[data-index-chips]')) {
        const bar = l.closest<HTMLElement>('[data-index-chips]')!;
        bar.scrollTo({ left: l.offsetLeft - 16, behavior: document.documentElement.dataset.motion === 'full' ? 'smooth' : 'auto' });
      }
    });
  };

  // The active section is the last one whose top has passed 35% of the viewport.
  // At the very bottom of the page, the last section wins (short final sections never reach the line).
  const update = () => {
    const line = window.innerHeight * 0.35;
    let id = targets[0].id;
    for (const t of targets) { if (t.getBoundingClientRect().top <= line) id = t.id; }
    const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
    const lastTop = targets[targets.length - 1].getBoundingClientRect().top;
    if (atEnd && lastTop < window.innerHeight) id = targets[targets.length - 1].id;
    setActive(id);
  };

  let raf = 0;
  const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  links.forEach((l) => l.addEventListener('click', () => setActive(l.hash.slice(1))));
  update();
}
