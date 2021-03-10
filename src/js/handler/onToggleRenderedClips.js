import { $$ } from '../utils/querySelector.js';
import storage from '../utils/localStorage.js';
import { showElement, hideElement } from '../utils/setAttribute.js';
import { LOCAL_STORAGE_KEY, LOCAL_STORAGE_VALUE } from '../utils/constant.js';
import $DOM from '../utils/DOM.js';

const setSelected = (isWatchedButton) => {
  if (isWatchedButton) {
    $DOM.NAVIGATOR.WATCHED_BUTTON.classList.add('bg-cyan-100');
    $DOM.NAVIGATOR.UNWATCHED_BUTTON.classList.remove('bg-cyan-100');
    return;
  }

  $DOM.NAVIGATOR.UNWATCHED_BUTTON.classList.add('bg-cyan-100');
  $DOM.NAVIGATOR.WATCHED_BUTTON.classList.remove('bg-cyan-100');
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
