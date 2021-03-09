import { $, $$ } from '../utils/querySelector.js';
import { showElement, hideElement } from '../utils/setAttribute.js';

const setSelected = (isWatched) => {
  const $watchedButton = $('[data-js="navigator__watched-button"]');
  const $unwatchedButton = $('[data-js="navigator__unwatched-button"]');

  if (isWatched) {
    $unwatchedButton.classList.add('bg-cyan-100');
    $watchedButton.classList.remove('bg-cyan-100');
    return;
  }

  $watchedButton.classList.add('bg-cyan-100');
  $unwatchedButton.classList.remove('bg-cyan-100');
};

export const onToggleRenderedClips = ({ target }) => {
  if (target.dataset.js === 'navigator__search-button') {
    return;
  }

  const savedClips = $$('[data-js="saved-page__clip"]');
  const isWatched = target.dataset.js === 'navigator__unwatched-button';

  setSelected(isWatched);
  savedClips.forEach((savedClip) => {
    savedClip.dataset.isWatched === String(isWatched) &&
    savedClip.dataset.isDeleted === String(false)
      ? showElement(savedClip)
      : hideElement(savedClip);
  });
};
