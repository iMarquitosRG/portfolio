/**
 * Quick view dialog. Triggers: any element with [data-qv-open="<dialog id>"] and [data-qv-index].
 * Native <dialog>.showModal() gives the focus trap, Esc and an inert page for free.
 */
import { sheetDrag, reset } from './sheet';

type Item = {
  title: string; line: string; body: string;
  facts: [string, string][]; link: string | null;
  images: { src: string; alt: string }[]; tint: string;
};
type Strings = Record<string, string>;

const root = document.documentElement;
const reduce = () => root.dataset.motion === 'reduce';

function setup(dlg: HTMLDialogElement) {
  const items: Item[] = JSON.parse(dlg.querySelector('[data-qv-items]')!.textContent || '[]');
  const t: Strings = JSON.parse(dlg.querySelector('[data-qv-strings]')!.textContent || '{}');
  const label = dlg.dataset.qvLabel || '';
  const $ = <T extends HTMLElement>(s: string) => dlg.querySelector<T>(s)!;
  const track = $('[data-qv-track]'), dots = $('[data-qv-dots]'), imgLabel = $('[data-qv-img-label]');
  const link = $<HTMLAnchorElement>('[data-qv-link]');
  const media = $('[data-qv-media]');
  let index = 0, slides = 0, current = 0, trigger: HTMLElement | null = null;

  const render = (i: number) => {
    index = (i + items.length) % items.length;
    const it = items[index];
    $('[data-qv-eyebrow]').textContent = `${label} · ${index + 1} ${t.of} ${items.length}`;
    $('[data-qv-title]').textContent = it.title;
    $('[data-qv-line]').textContent = it.line;
    $('[data-qv-copy]').textContent = it.body;
    $('[data-qv-count]').textContent = `${index + 1} / ${items.length}`;
    $('[data-qv-facts]').innerHTML = it.facts
      .map(([k, v]) => `<div><dt class="t-label c-tertiary">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
    if (it.link) { link.href = it.link; link.hidden = false; } else { link.hidden = true; link.removeAttribute('href'); }

    // Images only. Real images when provided, otherwise 3 placeholder slides in the item's tint.
    const imgs = it.images.length ? it.images : [0, 1, 2].map(() => null);
    slides = imgs.length;
    media.className = `qv__media grad tint-${it.tint}`;
    track.innerHTML = imgs.map((img, n) => `
      <figure class="qv__slide" aria-roledescription="slide" aria-label="${t.image} ${n + 1} ${t.of} ${slides}">
        ${img ? `<img src="${esc(img.src)}" alt="${esc(img.alt)}" loading="lazy" decoding="async">` : '<div class="mock qv__mock"></div>'}
      </figure>`).join('');
    dots.innerHTML = imgs.map((_, n) =>
      `<button type="button" class="qv__dot" aria-label="${t.goToImage} ${n + 1}" data-qv-dot="${n}"></button>`).join('');
    media.classList.toggle('is-single', slides < 2);
    track.scrollLeft = 0;
    setSlide(0);
  };

  const setSlide = (n: number) => {
    current = Math.max(0, Math.min(slides - 1, n));
    imgLabel.textContent = `${t.image} ${current + 1} ${t.of} ${slides}`;
    dots.querySelectorAll('.qv__dot').forEach((d, k) => d.setAttribute('aria-current', String(k === current)));
    dlg.querySelector<HTMLButtonElement>('[data-qv-img="-1"]')!.disabled = current === 0;
    dlg.querySelector<HTMLButtonElement>('[data-qv-img="1"]')!.disabled = current === slides - 1;
  };
  const goSlide = (n: number) => {
    const target = Math.max(0, Math.min(slides - 1, n));
    track.scrollTo({ left: target * track.clientWidth, behavior: reduce() ? 'auto' : 'smooth' });
    setSlide(target);
  };
  // Swipe / trackpad: the track scroll-snaps, so follow it.
  let raf = 0;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setSlide(Math.round(track.scrollLeft / Math.max(1, track.clientWidth))));
  }, { passive: true });

  const open = (i: number, from: HTMLElement) => {
    trigger = from;
    render(i);
    reset(dlg);
    dlg.showModal();
    root.classList.add('qv-open');
    $('[data-qv-title]').focus({ preventScroll: true });
  };
  const close = () => { if (dlg.open) dlg.close(); };

  dlg.addEventListener('close', () => {
    root.classList.remove('qv-open');
    reset(dlg);
    // Return focus to the card that opened it.
    trigger?.focus({ preventScroll: true });
  });

  // Click on the backdrop closes (the dialog box itself fills its own rect).
  dlg.addEventListener('click', (e) => {
    const el = e.target as HTMLElement;
    if (el.closest('[data-qv-close]')) return close();
    const step = el.closest<HTMLElement>('[data-qv-step]');
    if (step) return render(index + Number(step.dataset.qvStep));
    const img = el.closest<HTMLElement>('[data-qv-img]');
    if (img) return goSlide(current + Number(img.dataset.qvImg));
    const dot = el.closest<HTMLElement>('[data-qv-dot]');
    if (dot) return goSlide(Number(dot.dataset.qvDot));
    if (el === dlg) {
      const r = dlg.getBoundingClientRect();
      const { clientX: x, clientY: y } = e as MouseEvent;
      if (x < r.left || x > r.right || y < r.top || y > r.bottom) close();
    }
  });

  // Keyboard: ← → change image when the gallery has focus, item otherwise.
  dlg.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const dir = e.key === 'ArrowLeft' ? -1 : 1;
    const inMedia = (e.target as HTMLElement).closest('[data-qv-media]');
    e.preventDefault();
    if (inMedia) goSlide(current + dir);
    else render(index + dir);
  });

  sheetDrag(dlg, close);

  document.querySelectorAll<HTMLElement>(`[data-qv-open="${dlg.id}"]`).forEach((btn) => {
    btn.addEventListener('click', () => open(Number(btn.dataset.qvIndex || 0), btn));
  });
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

export function initQuickView() {
  document.querySelectorAll<HTMLDialogElement>('dialog[data-qv]').forEach(setup);
}
