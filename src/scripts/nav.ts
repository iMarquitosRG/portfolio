/** Top bar scrolled state + mobile bottom bar that shrinks while reading down. */
export function initNav() {
  const topbar = document.querySelector<HTMLElement>('[data-topbar]');
  const bottom = document.querySelector<HTMLElement>('[data-bottomnav]');
  const THRESHOLD = 16; // px of travel before the bar reacts, so it never flickers
  const EDGE = 80; // always full size near the top and the bottom of the page
  let lastY = window.scrollY;
  let anchorY = lastY;
  let lastDir = 0;
  let ticking = false;

  const update = () => {
    ticking = false;
    const y = window.scrollY;
    topbar?.classList.toggle('is-scrolled', y > 24);
    if (bottom) {
      const dir = y > lastY ? 1 : y < lastY ? -1 : 0;
      if (dir && dir !== lastDir) { anchorY = lastY; lastDir = dir; }
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (y < EDGE || y > max - EDGE) bottom.classList.remove('is-min');
      else if (dir === 1 && y - anchorY > THRESHOLD) bottom.classList.add('is-min');
      else if (dir === -1 && anchorY - y > THRESHOLD) bottom.classList.remove('is-min');
    }
    lastY = y;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();

  // Tapping the small bar first expands it.
  bottom?.addEventListener('click', (e) => {
    if (bottom.classList.contains('is-min')) {
      e.preventDefault();
      bottom.classList.remove('is-min');
      anchorY = window.scrollY;
    }
  }, true);

  // "Contact" works from pages without a full contact block.
  if (!document.getElementById('contact')) {
    document.querySelectorAll<HTMLAnchorElement>('a[href="#contact"]').forEach((a) => (a.href = '/#contact'));
  }
}
