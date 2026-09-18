import { getJakartaDate, millisecondsUntilJakartaMidnight } from '../utils/calendarDate';
import { editorialStatusLabels, getEditorialTemporalStatus } from '../utils/editorialStatus';

const updateEditorialStatuses = () => {
  const today = getJakartaDate(new Date());
  document.querySelectorAll<HTMLElement>('[data-editorial-temporal]').forEach(element => {
    const eventStart = element.dataset.eventStart;
    if (!eventStart) return;
    const status = getEditorialTemporalStatus(today, { eventStart, eventEnd: element.dataset.eventEnd });
    element.textContent = editorialStatusLabels[status];
    element.dataset.status = status;
  });
};

updateEditorialStatuses();
window.setTimeout(updateEditorialStatuses, millisecondsUntilJakartaMidnight(new Date()) + 50);
