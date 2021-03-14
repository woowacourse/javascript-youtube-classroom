import $DOM from '../../utils/DOM.js';
import storage from '../../utils/localStorage.js';
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_VALUE,
} from '../../utils/constant.js';

const setSelected = (selectedButton) => {
  $DOM.NAVIGATOR.BUTTONS.forEach((button) =>
    button.classList.remove('bg-cyan-100'),
  );

  selectedButton.classList.add('bg-cyan-100');
};

export const onToggleRenderedClips = ({ target }) => {
  if (target.dataset.js === 'navigator__search-button') {
    return;
  }

  const isWatchedButton = target.dataset.js === 'navigator__watched-button';
  const savePageVideoWrapper = $DOM.SAVE_PAGE.VIDEO_WRAPPER;

  setSelected(target);

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
