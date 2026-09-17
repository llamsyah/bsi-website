import { resolveAssistant } from './resolver.ts';
import type { AssistantService } from './types';

/** Replacement boundary for a future separately authorized backend; currently local only. */
export const askAssistant: AssistantService = async request => resolveAssistant(request);
