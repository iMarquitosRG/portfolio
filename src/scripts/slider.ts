/** Hero slider (desktop): 5s autoplay, paused only with the pause button (WCAG 2.2.2), no autoplay with Reduce motion. */
export function initSlider() {
  const el = document.querySelector<HTMLElement>('[data-slider]');
  if (!el) return;
  const root = document.documentElement;
  const slides = [...el.querySelectorAll<HTMLElement>('[data-slide]')];
  const dots = [...el.querySelectorAll<HTMLButtonElement>('[data-slider-dot]')];
  const pauseBtn = el.querySelector<HTMLButtonElement>('[data-slider-pause]');
  const track = el.querySelector<HTMLElement>('[data-slider-track]');
  let i = 0;
  let timer: number | undefined;
  let userPaused = false;

  const show = (n: number) => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => {
      s.toggleAttribute('data-active', k === i);
      s.tabIndex = k === i ? 0 : -1;
    });
    dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'));
    el.style.setProperty('--progress-key', String(i));
    el.classList.remove('is-ticking');
    void el.offsetWidth;
    if (playing()) el.classList.add('is-ticking');
  };
  const visible = () => el.offsetParent !== null;
  const playing = () => !userPaused && root.dataset.motion === 'full' && visible();
  const schedule = () => {
    window.clearTimeout(timer);
    el.classList.toggle('is-paused', !playing());
    track?.setAttribute('aria-live', playing() ? 'off' : 'polite');
    if (playing()) { el.classList.add('is-ticking'); timer = window.setTimeout(() => { show(i + 1); schedule(); }, 5000); }
    else el.classList.remove('is-ticking');
  };

  dots.forEach((d, k) => d.addEventListener('click', () => { show(k); schedule(); }));
  pauseBtn?.addEventListener('click', () => {
    userPaused = !userPaused;
    pauseBtn.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
    schedule();
  });
  window.addEventListener('prefs:change', schedule);
  window.addEventListener('resize', schedule, { passive: true });
  show(0);
  schedule();
}
