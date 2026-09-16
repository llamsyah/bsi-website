import { filterPrograms } from '../utils/programSearch';

const root = document.querySelector<HTMLElement>('[data-program-explorer]');
const form = root?.querySelector<HTMLFormElement>('.program-controls');
const search = root?.querySelector<HTMLInputElement>('#program-search');
const faculty = root?.querySelector<HTMLSelectElement>('#faculty-filter');
const count = root?.querySelector<HTMLElement>('[data-program-count]');
const empty = root?.querySelector<HTMLElement>('[data-program-empty]');
const cards = Array.from(root?.querySelectorAll<HTMLElement>('[data-program-id]') ?? []);

if (root && form && search && faculty && count && empty) {
  const programs = cards.map((card) => ({
    id: card.dataset.programId ?? '',
    name: card.dataset.programName ?? '',
    facultyId: card.dataset.programFaculty ?? '',
  }));
  const updateResults = () => {
    const matches = filterPrograms(programs, search.value, faculty.value);
    const visibleIds = new Set(matches.map((program) => program.id));
    cards.forEach((card) => { card.hidden = !visibleIds.has(card.dataset.programId ?? ''); });
    count.textContent = `Menampilkan ${matches.length} dari ${programs.length} program.`;
    empty.hidden = matches.length !== 0;
  };
  const resetResults = () => {
    search.value = '';
    faculty.value = 'all';
    updateResults();
    search.focus();
  };
  search.addEventListener('input', updateResults);
  faculty.addEventListener('change', updateResults);
  form.addEventListener('submit', (event) => event.preventDefault());
  form.addEventListener('reset', (event) => { event.preventDefault(); resetResults(); });
  root.querySelector('[data-program-reset]')?.addEventListener('click', resetResults);
  window.addEventListener('pageshow', updateResults);
  updateResults();
  form.hidden = false;
}
