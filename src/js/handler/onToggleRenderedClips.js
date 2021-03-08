import { $$ } from '../utils/querySelector.js';
import { showElement, hideElement } from '../utils/setAttribute.js';

export const onToggleRenderedClips = ({ target }) => {
  const savedClips = $$('[data-js="saved-page__clip"]');

  if (target.dataset.js === 'navigator__search') {
    return;
  }

  const isWatched = target.dataset.js === 'navigator__unwatched-button';
  savedClips.forEach((savedClip) => {
    savedClip.dataset.iswatched === String(isWatched)
      ? showElement(savedClip)
      : hideElement(savedClip);
  });
};
