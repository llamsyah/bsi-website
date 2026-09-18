import { parseAcademicSelection } from '../utils/academicSelection';

const root = document.querySelector<HTMLElement>('[data-program-explorer]');
const cards = Array.from(root?.querySelectorAll<HTMLElement>('[data-program-id]') ?? []);

if (root) {
  const revealLinkedProgram = () => {
    const selection = parseAcademicSelection(location.search);
    if (selection.degreeLevel !== 'S1' || !selection.program) return;
    const card = cards.find(item => item.dataset.programId === selection.program?.id);
    const facultyGroup = card?.closest<HTMLDetailsElement>('[data-faculty-group]');
    if (facultyGroup) facultyGroup.open = true;
  };
  window.addEventListener('pageshow', revealLinkedProgram);
  window.addEventListener('academic-selection-change', revealLinkedProgram);
  window.addEventListener('popstate', revealLinkedProgram);
  revealLinkedProgram();
}
