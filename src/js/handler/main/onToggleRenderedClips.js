import { $$ } from '../../utils/querySelector.js';
import $DOM from '../../utils/DOM.js';
import storage from '../../utils/localStorage.js';
import { showElement, hideElement } from '../../utils/setAttribute.js';
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_VALUE,
} from '../../utils/constant.js';

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

  const isWatchedButton = target.dataset.js === 'navigator__watched-button';
  const savePageVideoWrapper = $DOM.SAVE_PAGE.VIDEO_WRAPPER;

  setSelected(isWatchedButton);

  storage.set(
    LOCAL_STORAGE_KEY.CURRENT_TAB,
    isWatchedButton
      ? LOCAL_STORAGE_VALUE.WATCHED
      : LOCAL_STORAGE_VALUE.UNWATCHED,
  );

  if (isWatchedButton) {
    savePageVideoWrapper.classList.add('watched-section');
    savePageVideoWrapper.classList.remove('unwatched-section');
    return;
  }
  savePageVideoWrapper.classList.add('unwatched-section');
  savePageVideoWrapper.classList.remove('watched-section');
};
