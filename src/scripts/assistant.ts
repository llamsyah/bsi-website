import { parseAcademicSelection, type AcademicContext } from '../utils/academicSelection';
import { askAssistant } from '../assistant/service';
import { createAssistantMessage } from '../assistant/render';
import { MAX_QUESTION_LENGTH } from '../assistant/resolver';
import { getJakartaDate } from '../utils/calendarDate';

const trigger = document.querySelector<HTMLButtonElement>('[data-assistant-trigger]');
const dialog = document.querySelector<HTMLDialogElement>('#assistant-dialog');

if (trigger && dialog && typeof dialog.showModal === 'function') {
  const close = dialog.querySelector<HTMLButtonElement>('[data-assistant-close]')!;
  const input = dialog.querySelector<HTMLInputElement>('#assistant-question')!;
  const form = dialog.querySelector<HTMLFormElement>('[data-assistant-form]')!;
  const messages = dialog.querySelector<HTMLElement>('[data-assistant-messages]')!;
  const scroll = dialog.querySelector<HTMLElement>('[data-assistant-scroll]')!;
  const suggestions = dialog.querySelector<HTMLElement>('[data-assistant-suggestions]')!;
  const feedback = dialog.querySelector<HTMLElement>('[data-assistant-feedback]')!;
  const initialSelection = parseAcademicSelection(location.search);
  let academicContext: AcademicContext | undefined = initialSelection.error ? undefined : { degreeLevel: initialSelection.degreeLevel, programId: initialSelection.program?.id };
  window.addEventListener('academic-selection-change', () => {
    const selection = parseAcademicSelection(location.search);
    academicContext = selection.error ? undefined : { degreeLevel: selection.degreeLevel, programId: selection.program?.id };
  });
  let pending = false;
  let previousOverflow = '';
  input.maxLength = MAX_QUESTION_LENGTH;

  function fitViewport() {
    if (!dialog?.open) return;
    // Keeps the composer inside the visible area when a mobile keyboard reduces it.
    dialog.style.setProperty('--assistant-visible-height', `${window.visualViewport?.height ?? window.innerHeight}px`);
    dialog.style.setProperty('--assistant-visible-top', `${window.visualViewport?.offsetTop ?? 0}px`);
  }
  trigger.addEventListener('click', () => {
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    fitViewport();
    close.focus();
  });
  close.addEventListener('click', () => dialog.close());
  // Native modal Escape handling also fires close; keep a single restoration path.
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    trigger.focus({ preventScroll: true });
  });
  window.visualViewport?.addEventListener('resize', fitViewport);
  window.visualViewport?.addEventListener('scroll', fitViewport);
  window.addEventListener('resize', fitViewport);

  async function submit(question: string) {
    const text = question.trim();
    if (!text || pending) return;
    if (text.length > MAX_QUESTION_LENGTH) {
      feedback.textContent = `Batasi pertanyaan hingga ${MAX_QUESTION_LENGTH} karakter.`;
      return;
    }
    pending = true;
    feedback.textContent = 'Mencocokkan pertanyaan dengan informasi website…';
    messages.append(createAssistantMessage(document, text));
    input.value = '';
    input.focus({ preventScroll: true });
    suggestions.hidden = true;
    // Keep the start of the new exchange readable, including long answers on mobile.
    const exchangeTop = messages.lastElementChild!.getBoundingClientRect().top - scroll.getBoundingClientRect().top + scroll.scrollTop;
    try {
      const response = await askAssistant({ question: text, referenceDate: getJakartaDate(new Date()), context: academicContext });
      academicContext = response.context ?? academicContext;
      messages.append(createAssistantMessage(document, response.text, response));
      feedback.textContent = '';
    } catch {
      const response = { text: 'Asisten belum bisa menjawab saat ini. Informasi website tetap dapat digunakan.', status: 'unsupported' as const, actions: [{ label: 'Lihat Panduan PMB', href: '/pmb' }] };
      messages.append(createAssistantMessage(document, response.text, response));
      feedback.textContent = 'Jawaban tidak tersedia. Silakan coba lagi.';
    } finally {
      pending = false;
      scroll.scrollTop = exchangeTop;
    }
  }
  form.addEventListener('submit', event => { event.preventDefault(); void submit(input.value); });
  suggestions.querySelectorAll<HTMLButtonElement>('button').forEach(button => {
    button.addEventListener('click', () => void submit(button.textContent ?? ''));
  });
  // A same-page response action must release the modal before moving to its anchor.
  messages.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a')) dialog.close();
  });
  trigger.hidden = false;
}
