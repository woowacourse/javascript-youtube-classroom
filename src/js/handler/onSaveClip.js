import { $ } from '../utils/querySelector.js';
import { renderSavedClip } from '../view/main.js';
import { MESSAGE, LOCAL_STORAGE_KEY, YOUTUBE } from '../utils/constant.js';
import storage from '../utils/localStorage.js';
import { hideElement } from '../utils/setAttribute.js';
import { snackbar } from '../utils/snackbar.js';

export const onSaveClip = ({ target }) => {
  if (target.dataset.js !== 'save-button') {
    return;
  }

  const clipIndex = target.dataset.clipIndex;
  const recentSearchResults =
    storage.get(LOCAL_STORAGE_KEY.RECENT_SEARCH_RESULTS) ?? [];
  const savedClip = recentSearchResults[clipIndex];
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? [];
  const existClips = savedClips.filter((savedClip) => savedClip.isDeleted);

  if (existClips.length >= YOUTUBE.MAXIMUM_SAVE_CLIPS) {
    snackbar(MESSAGE.ERROR.EXCEED_MAXIMUM_CLIP_COUNT);
    return;
  }

  hideElement(target);
  hideElement($('[data-js="saved-page__not-found"]'));

  savedClips.push(savedClip);
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);

  renderSavedClip(savedClip, savedClips.length - 1);
};
