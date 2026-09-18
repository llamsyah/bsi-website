import { parseAcademicSelection, academicHref } from '../utils/academicSelection';
import type { DegreeLevel } from '../data/academic';

const nav = document.querySelector<HTMLElement>('[data-degree-nav]');
if (nav) {
  const journeyLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('nav a[href="/program-studi"], nav a[href="/biaya-beasiswa"], nav a[href="/pmb"]'))
    .map(link => ({ link, path: link.getAttribute('href')! }));
  function updateJourneyLinks() {
    const state = parseAcademicSelection(location.search);
    journeyLinks.forEach(({ link, path }) => { link.href = academicHref(path, { degreeLevel: state.degreeLevel, programId: state.program?.id }); });
  }
  const select = document.querySelector<HTMLSelectElement>('[data-graduate-select]');
  document.querySelector<HTMLElement>('[data-graduate-select-wrap]')?.removeAttribute('hidden');
  function render(announce = false) {
    const state = parseAcademicSelection(location.search);
    document.querySelectorAll<HTMLElement>('[data-degree-panel]').forEach(panel => { panel.hidden = panel.dataset.degreePanel !== state.degreeLevel; });
    nav!.querySelectorAll<HTMLAnchorElement>('[data-degree-link]').forEach(link => {
      link.setAttribute('aria-current', String(link.dataset.degreeLink === state.degreeLevel));
    });
    const message = nav!.querySelector<HTMLElement>('[data-academic-error]')!;
    message.hidden = !state.error;
    message.textContent = state.error ?? '';
    if (select) select.value = state.program?.degreeLevel === 'S2' ? state.program.id : '';
    document.querySelectorAll<HTMLElement>('[data-graduate-program]').forEach(panel => {
      panel.hidden = !!state.program && panel.dataset.graduateProgram !== state.program.id;
    });
    if (announce) nav!.querySelector<HTMLElement>('[data-degree-announcement]')!.textContent = `Menampilkan ${state.degreeLevel === 'S2' ? 'Pascasarjana (S2)' : 'Sarjana (S1)'}.`;
    window.dispatchEvent(new CustomEvent('academic-selection-change', { detail: state }));
  }
  nav.querySelectorAll<HTMLAnchorElement>('[data-degree-link]').forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const state = parseAcademicSelection(location.search);
    const degreeLevel = link.dataset.degreeLink as DegreeLevel;
    history.pushState(null, '', academicHref(location.pathname, { degreeLevel,
      programId: state.degreeLevel === degreeLevel ? state.program?.id : undefined }));
    render(true);
  }));
  select?.addEventListener('change', () => {
    history.pushState(null, '', academicHref(location.pathname, { degreeLevel: 'S2', programId: select.value }));
    render();
  });
  window.addEventListener('popstate', () => render(true));
  window.addEventListener('academic-selection-change', updateJourneyLinks);
  render();
}
