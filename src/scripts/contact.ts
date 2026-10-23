/** Copy-email buttons + live local time in Mexico City. */
export function initContact() {
  const toast = document.querySelector<HTMLElement>('[data-toast]');
  let hideTimer: number | undefined;
  const say = (msg: string) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('is-visible');
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3200);
  };

  document.querySelectorAll<HTMLAnchorElement>('[data-copy-email]').forEach((a) => {
    a.addEventListener('click', async (e) => {
      const email = a.dataset.copyEmail!;
      if (!navigator.clipboard) return; // falls back to mailto
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(email);
        say('Email copied');
      } catch {
        say(`Couldn’t copy. Email: ${email}`);
      }
    });
  });

  const clocks = document.querySelectorAll<HTMLElement>('[data-localtime]');
  if (clocks.length) {
    const fmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Mexico_City' });
    const tick = () => clocks.forEach((c) => (c.textContent = `${fmt.format(new Date())} · CST (UTC−6)`));
    tick();
    window.setInterval(tick, 30_000);
  }
}
