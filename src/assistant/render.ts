import type { AssistantResponse } from './types';
import { registration } from '../data/admissions.ts';

/** Response links stay on known website routes or the one official registration entry. */
export function isAssistantActionAllowed(href: string): boolean {
  if (href === registration.url) return true;
  if (!href.startsWith('/') || href.startsWith('//') || href.includes('\\')) return false;
  const url = new URL(href, 'https://website.invalid');
  return url.origin === 'https://website.invalid' && ['/', '/program-studi', '/biaya-beasiswa', '/kampus', '/pmb'].includes(url.pathname);
}

/** DOM nodes only: both questions and response text remain literal, even if markup-like. */
export function createAssistantMessage(document: Document, text: string, response?: AssistantResponse): HTMLElement {
  const message = document.createElement('article');
  message.className = response ? 'assistant-message assistant-answer' : 'assistant-message assistant-question';
  const author = document.createElement('p');
  author.className = 'assistant-author';
  author.textContent = response ? 'Tanya BSI' : 'Kamu';
  const body = document.createElement('p');
  body.className = 'assistant-message-text';
  body.textContent = text;
  message.append(author, body);
  if (response?.sourceContext) {
    const context = document.createElement('p');
    context.className = 'assistant-source';
    context.textContent = response.sourceContext;
    message.append(context);
  }
  if (response?.actions.length) {
    const actions = document.createElement('div');
    actions.className = 'assistant-actions';
    for (const action of response.actions) {
      if (!isAssistantActionAllowed(action.href)) continue;
      const link = document.createElement('a');
      link.href = action.href;
      link.textContent = action.label;
      actions.append(link);
    }
    message.append(actions);
  }
  return message;
}
