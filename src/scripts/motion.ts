/**
 * Motion system (GSAP). Loaded only when motion is allowed.
 * - Headlines [data-split]: line-by-line masked reveal (SplitText)
 * - Blocks [data-reveal]: fade + rise, staggered in batches on scroll
 * - Big words [data-bigword]: slow rise on enter
 * - [data-parallax="n"]: scroll-scrubbed drift (n = yPercent over the section)
 * - [data-count]: numbers count up when visible
 * - [data-magnetic]: buttons lean toward the pointer (mouse/trackpad only)
 * Everything is reverted instantly if Reduce motion is turned on.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const root = document.documentElement;
const EASE = 'expo.out';
let ctx: gsap.Context | null = null;
const magnetics: Array<() => void> = [];

function isHero(el: Element) {
  return !!el.closest('[data-hero]');
}

function build(entrances: boolean) {
  ctx = gsap.context(() => {
    if (entrances) {
      // Take over the hidden state from CSS before the js-motion class is removed.
      gsap.set('[data-reveal]', { opacity: 0, y: 24 });
      const heroTl = gsap.timeline({ defaults: { ease: EASE } });

      gsap.utils.toArray<HTMLElement>('[data-bigword]').forEach((el) => {
        gsap.set(el, { visibility: 'visible' });
        const from = { yPercent: 18, opacity: 0 };
        if (isHero(el)) heroTl.from(el, { ...from, duration: 1.6, stagger: 0.08 }, 0);
        else gsap.from(el, { ...from, duration: 1.4, ease: EASE, scrollTrigger: { trigger: el, start: 'top 95%', once: true } });
      });

      gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: 'visible' });
            const tween = { yPercent: 110, duration: 1.1, ease: EASE, stagger: 0.08 };
            if (isHero(el)) return heroTl.from(self.lines, tween, 0.25);
            return gsap.from(self.lines, { ...tween, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
          },
        });
      });

      const heroReveals = gsap.utils.toArray<HTMLElement>('[data-hero] [data-reveal]');
      if (heroReveals.length) heroTl.to(heroReveals, { opacity: 1, y: 0, duration: 1, stagger: 0.08 }, 0.5);

      gsap.from('[data-topbar] > *', { y: -12, opacity: 0, duration: 0.9, ease: EASE, stagger: 0.06, delay: 0.1 });

      ScrollTrigger.batch('[data-reveal]:not([data-hero] [data-reveal])', {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
      });

      gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        if (!Number.isFinite(end)) return;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end, duration: 1.4, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => (el.textContent = String(Math.round(obj.v))),
        });
      });
    }

    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
      const amount = Number(el.dataset.parallax) || -8;
      const trigger = el.closest('section, article') ?? el;
      gsap.fromTo(el, { yPercent: 0 }, {
        yPercent: amount, ease: 'none',
        scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
    });
  });

  // Magnetic buttons (fine pointers only)
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
      };
      const leave = () => { xTo(0); yTo(0); };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      magnetics.push(() => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
        gsap.set(el, { clearProps: 'x,y,transform' });
      });
    });
  }
}

function teardown() {
  ctx?.revert();
  ctx = null;
  ScrollTrigger.getAll().forEach((t) => t.kill());
  magnetics.splice(0).forEach((off) => off());
  root.classList.remove('js-motion');
}

export function initMotion() {
  (window as any).__motionReady = true;
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    build(root.classList.contains('js-motion'));
    root.classList.remove('js-motion');
  };
  // Split lines after fonts load (correct line breaks), but never wait more than 1.2s.
  (document.fonts?.ready ?? Promise.resolve()).then(start);
  window.setTimeout(start, 1200);

  window.addEventListener('prefs:change', () => {
    if (root.dataset.motion === 'reduce') teardown();
    else if (!ctx) build(false);
    ScrollTrigger.refresh();
  });
  // Text size changes reflow everything.
  new MutationObserver(() => ScrollTrigger.refresh()).observe(root, { attributes: true, attributeFilter: ['data-text-size'] });
}
