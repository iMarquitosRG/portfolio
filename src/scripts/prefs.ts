/** Accessibility panel: reads/writes the same data-* attributes the inline head script sets. */
type Prefs = {
  theme?: 'dark' | 'light' | 'system';
  transparency?: boolean;
  motion?: boolean;
  contrast?: boolean;
  textSize?: 'base' | 'lg' | 'xl';
};
const KEY = 'mr-prefs';
const root = document.documentElement;
const mq = (q: string) => window.matchMedia?.(q).matches ?? false;

function load(): Prefs {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; }
}
function save(p: Prefs) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* private mode: settings last for this page only */ }
}

function apply(p: Prefs) {
  const pref = p.theme ?? 'dark';
  root.dataset.themePref = pref;
  root.dataset.theme = pref === 'system' ? (mq('(prefers-color-scheme: light)') ? 'light' : 'dark') : pref;
  root.dataset.material = (p.transparency ?? mq('(prefers-reduced-transparency: reduce)')) ? 'solid' : 'glass';
  root.dataset.motion = (p.motion ?? mq('(prefers-reduced-motion: reduce)')) ? 'reduce' : 'full';
  root.dataset.contrast = (p.contrast ?? mq('(prefers-contrast: more)')) ? 'more' : 'normal';
  root.dataset.textSize = p.textSize ?? 'base';
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', root.dataset.theme === 'light' ? '#fafafa' : '#0a0a0b');
  window.dispatchEvent(new CustomEvent('prefs:change'));
}

function sync(form: HTMLElement) {
  const set = (sel: string, on: boolean) => { const el = form.querySelector<HTMLInputElement>(sel); if (el) el.checked = on; };
  set(`input[name="theme"][value="${root.dataset.themePref}"]`, true);
  set(`input[name="textSize"][value="${root.dataset.textSize}"]`, true);
  set('input[name="transparency"]', root.dataset.material === 'solid');
  set('input[name="motion"]', root.dataset.motion === 'reduce');
  set('input[name="contrast"]', root.dataset.contrast === 'more');
}

export function initPrefs() {
  const panel = document.querySelector<HTMLElement>('[data-a11y]');
  const trigger = document.getElementById('a11y-trigger');
  if (!panel) return;
  let prefs = load();
  sync(panel);

  panel.addEventListener('change', (e) => {
    const t = e.target as HTMLInputElement;
    if (t.name === 'theme') prefs.theme = t.value as Prefs['theme'];
    else if (t.name === 'textSize') prefs.textSize = t.value as Prefs['textSize'];
    else if (t.name === 'transparency' || t.name === 'motion' || t.name === 'contrast') prefs[t.name] = t.checked;
    save(prefs);
    apply(prefs);
  });

  panel.querySelector('[data-a11y-reset]')?.addEventListener('click', () => {
    prefs = {};
    try { localStorage.removeItem(KEY); } catch { /* ignore */ }
    apply(prefs);
    sync(panel);
  });

  // Follow the OS when the person hasn't chosen.
  window.matchMedia?.('(prefers-color-scheme: light)').addEventListener('change', () => {
    if ((prefs.theme ?? 'dark') === 'system') apply(prefs);
  });

  // Focus management + aria-expanded (popover handles Esc and outside click).
  panel.addEventListener('toggle', (e) => {
    const open = (e as ToggleEvent).newState === 'open';
    trigger?.setAttribute('aria-expanded', String(open));
    if (open) {
      sync(panel);
      panel.querySelector<HTMLElement>('#a11y-title')?.focus();
    } else if (panel.contains(document.activeElement) || document.activeElement === document.body) {
      trigger?.focus();
    }
  });
}
