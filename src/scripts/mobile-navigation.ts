const nav = document.querySelector<HTMLElement>('[data-navigation]');
const toggle = nav?.querySelector<HTMLButtonElement>('.menu-toggle');
const panel = nav?.querySelector<HTMLElement>('#primary-links');
const label = toggle?.querySelector<HTMLElement>('[data-menu-label]');

if (nav && toggle && panel && label) {
  const mobile = window.matchMedia('(max-width: 74rem)');

  function setOpen(open: boolean) {
    if (!toggle || !panel || !label) return;
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Tutup' : 'Menu';
    panel.hidden = mobile.matches && !open;
  }

  function syncViewport() {
    if (!toggle || !panel) return;
    // Keep focus on a visible control when crossing the navigation breakpoint.
    const focusInPanel = panel.contains(document.activeElement);
    const focusOnToggle = document.activeElement === toggle;
    toggle.hidden = !mobile.matches;
    setOpen(false);
    if (mobile.matches && focusInPanel) toggle.focus();
    if (!mobile.matches && focusOnToggle) panel.querySelector<HTMLAnchorElement>('a')?.focus();
  }

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  panel.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('click', event => {
    if (event.target instanceof Node && !nav.contains(event.target)) setOpen(false);
  });
  nav.addEventListener('focusout', event => {
    if (event.relatedTarget instanceof Node && !nav.contains(event.relatedTarget)) setOpen(false);
  });
  mobile.addEventListener('change', syncViewport);
  window.addEventListener('pageshow', syncViewport);
  syncViewport();
}
