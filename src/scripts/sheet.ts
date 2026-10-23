/**
 * Bottom sheet drag (phones). Drag the grabber or header down to close.
 * Shared by the Accessibility panel and the Quick view.
 */
export const isPhone = () => window.matchMedia('(max-width: 743px)').matches;

export function sheetDrag(panel: HTMLElement, close: () => void) {
  const handles = panel.querySelectorAll<HTMLElement>('[data-sheet-grab], [data-sheet-handle]');
  let startY = 0, dy = 0, startT = 0, id = -1;

  const down = (e: PointerEvent) => {
    if (!isPhone() || id !== -1) return;
    // Let buttons inside the header (close) work normally.
    if ((e.target as HTMLElement).closest('button, a')) return;
    id = e.pointerId; dy = 0; startY = e.clientY; startT = performance.now();
    panel.classList.add('is-dragging');
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const move = (e: PointerEvent) => {
    if (e.pointerId !== id) return;
    dy = Math.max(0, e.clientY - startY);
    // A little resistance feels native; never move up.
    panel.style.translate = `0 ${dy}px`;
  };
  const up = (e: PointerEvent) => {
    if (e.pointerId !== id) return;
    id = -1;
    panel.classList.remove('is-dragging');
    const velocity = dy / Math.max(1, performance.now() - startT);
    if (dy > Math.min(120, panel.offsetHeight * 0.25) || (dy > 30 && velocity > 0.5)) {
      panel.style.translate = '0 100%';
      const wait = document.documentElement.dataset.motion === 'reduce' ? 0 : 220;
      window.setTimeout(() => { close(); reset(panel); }, wait);
    } else {
      panel.style.translate = '';
    }
  };
  handles.forEach((h) => {
    h.style.touchAction = 'none';
    h.addEventListener('pointerdown', down);
    h.addEventListener('pointermove', move);
    h.addEventListener('pointerup', up);
    h.addEventListener('pointercancel', up);
  });
}

export function reset(panel: HTMLElement) {
  panel.style.translate = '';
  panel.classList.remove('is-dragging');
}
