export interface SearchableProgram {
  readonly id: string;
  readonly name: string;
  readonly facultyId: string;
}

/** An unrecognized faculty safely falls back to all faculties, retaining the query. */
export function filterPrograms<T extends SearchableProgram>(
  programs: readonly T[], query = '', faculty = 'all',
): T[] {
  const normalizedQuery = query.trim().replace(/\s+/g, ' ').toLocaleLowerCase('id');
  const knownFaculty = programs.some((program) => program.facultyId === faculty);
  return programs.filter((program) =>
    (!knownFaculty || program.facultyId === faculty)
    && program.name.toLocaleLowerCase('id').includes(normalizedQuery));
}

/** Keeps faculty order explicit and omits empty groups without mutating program data. */
export function groupProgramsByFaculty<T extends SearchableProgram>(
  programs: readonly T[], facultyOrder: readonly string[],
) {
  return facultyOrder.map((facultyId) => ({
    facultyId,
    programs: programs.filter((program) => program.facultyId === facultyId),
  })).filter((group) => group.programs.length > 0);
}
