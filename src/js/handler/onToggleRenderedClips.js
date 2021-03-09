import { $, $$ } from '../utils/querySelector.js';
import storage from '../utils/localStorage.js';
import { showElement, hideElement } from '../utils/setAttribute.js';
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_VALUE } from '../utils/constant.js';

const setSelected = (isWatchedButton) => {
  const $watchedButton = $('[data-js="navigator__watched-button"]');
  const $unwatchedButton = $('[data-js="navigator__unwatched-button"]');

  if (isWatchedButton) {
    $watchedButton.classList.add('bg-cyan-100');
    $unwatchedButton.classList.remove('bg-cyan-100');
    return;
  }

  $unwatchedButton.classList.add('bg-cyan-100');
  $watchedButton.classList.remove('bg-cyan-100');
};

export const onToggleRenderedClips = ({ target }) => {
  if (target.dataset.js === 'navigator__search-button') {
    return;
  }

  const savedClips = $$('[data-js="saved-page__clip"]');
  const isWatchedButton = target.dataset.js === 'navigator__watched-button';

  setSelected(isWatchedButton);
  savedClips.forEach((savedClip) => {
    savedClip.dataset.isWatched === String(isWatchedButton) &&
    savedClip.dataset.isDeleted === String(false)
      ? showElement(savedClip)
      : hideElement(savedClip);
  });

  storage.set(
    LOCAL_STORAGE_KEY.CURRENT_TAB,
    isWatchedButton
      ? LOCAL_STORAGE_VALUE.WATCHED
      : LOCAL_STORAGE_VALUE.UNWATCHED,
  );
};
