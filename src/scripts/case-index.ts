/** Case study index: highlights the section in view (sidebar on desktop, chip bar below). */
export function initCaseIndex() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-index-link]')];
  if (!links.length) return;
  const targets = [...document.querySelectorAll<HTMLElement>('[data-index-target]')];
  const setActive = (id: string) => {
    links.forEach((l) => {
      const on = l.hash === `#${id}`;
      if (on) l.setAttribute('aria-current', 'true'); else l.removeAttribute('aria-current');
      if (on && l.closest('[data-index-chips]')) {
        const bar = l.closest<HTMLElement>('[data-index-chips]')!;
        bar.scrollTo({ left: l.offsetLeft - 16, behavior: document.documentElement.dataset.motion === 'full' ? 'smooth' : 'auto' });
      }
    });
  };
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    },
    { rootMargin: '-30% 0px -60% 0px' },
  );
  targets.forEach((t) => io.observe(t));
}
