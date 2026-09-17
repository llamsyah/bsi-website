export interface AssistantAction { label: string; href: string }

export interface AssistantResponse {
  text: string;
  actions: readonly AssistantAction[];
  sourceContext?: string;
  status: 'answered' | 'clarify' | 'unsupported';
}

export interface AssistantRequest {
  question: string;
  /** Explicit campus calendar date; supplied by the UI, never inferred by the resolver. */
  referenceDate: string;
}

export type AssistantService = (request: AssistantRequest) => Promise<AssistantResponse>;
