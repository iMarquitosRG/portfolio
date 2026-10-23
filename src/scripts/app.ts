import { initPrefs } from './prefs';
import { initNav } from './nav';
import { initSlider } from './slider';
import { initContact } from './contact';
import { initCaseIndex } from './case-index';

const root = document.documentElement;

initPrefs();
initNav();
initSlider();
initContact();
initCaseIndex();

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
