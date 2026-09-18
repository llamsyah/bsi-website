import { graduatePrograms, graduateCosts } from '../data/graduate.ts';

/** Published payment alternatives, not additive charges or a promised final bill. */
export function getGraduateCost(programId: string) {
  const program = graduatePrograms.find(item => item.id === programId);
  if (!program) return null;
  const cost = graduateCosts[program.costModel]!;
  const semesterProduct = cost.semesterPayment * program.durationSemesters;
  const installmentProduct = cost.installment.amount * cost.installment.count;
  return { program, cost, semesterProduct, installmentProduct,
    difference: installmentProduct - cost.programTotal,
    inconsistent: semesterProduct !== cost.programTotal || installmentProduct !== cost.programTotal };
}
