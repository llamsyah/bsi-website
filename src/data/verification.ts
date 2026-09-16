/** Evidence refers to the local research baseline, not a new live verification. */
export interface VerificationMetadata {
  source: string;
  verifiedAt: string;
  verificationStatus: 'VERIFIED' | 'PROJECT_CONFIRMED' | 'NEEDS CONTEXT'
    | 'NEEDS SOURCE' | 'CONFLICTING' | 'OUTDATED' | 'NOT ENOUGH EVIDENCE';
  scope: string;
  period?: string;
}
