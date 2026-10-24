import { initPrefs } from './prefs';
import { initNav } from './nav';
import { initSlider } from './slider';
import { initContact } from './contact';
import { initCaseIndex } from './case-index';
import { initQuickView } from './quickview';

const root = document.documentElement;

initPrefs();
initNav();
initSlider();
initContact();
initCaseIndex();
initQuickView();

// Motion is the heaviest piece (GSAP), so it loads only when motion is allowed.
let motionLoaded = false;
async function loadMotion() {
  if (motionLoaded || root.dataset.motion !== 'full') {
    (window as any).__motionReady = true;
    root.classList.remove('js-motion');
    return;
  }
  motionLoaded = true;
  const { initMotion } = await import('./motion');
  initMotion();
}
loadMotion();
window.addEventListener('prefs:change', () => {
  if (root.dataset.motion === 'full') loadMotion();
});

// Links like /about#built: land exactly on the section. Smooth scroll on <html> plus late layout
// (fonts, images, text reveals) can leave Safari at the top of the page, so jump instantly and
// re-check once the page has settled.
function jumpToHash() {
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (!target) return;
  root.style.scrollBehavior = 'auto';
  target.scrollIntoView({ block: 'start' });
  requestAnimationFrame(() => { root.style.scrollBehavior = ''; });
}
if (location.hash) {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  jumpToHash();
  window.addEventListener('load', () => { jumpToHash(); setTimeout(jumpToHash, 400); }, { once: true });
  document.fonts?.ready.then(jumpToHash);
}
