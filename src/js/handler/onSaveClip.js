import { renderSavedClips } from '../view/main.js';
import storage from '../utils/localStorage.js';
import {
  ERROR_MESSAGE,
  LOCAL_STORAGE_KEY,
  YOUTUBE,
} from '../utils/constant.js';

export const onSaveClip = ({ target }) => {
  if (target.dataset.js !== 'save-button') {
    return;
  }

  const clipIndex = target.dataset.clipIndex;
  const recentSearchResults =
    storage.get(LOCAL_STORAGE_KEY.RECENT_SEARCH_RESULTS) ?? [];
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? [];

  if (savedClips.length >= YOUTUBE.MAXIMUM_SAVE_CLIPS) {
    alert(ERROR_MESSAGE.EXCEED_MAXIMUM_CLIP_COUNT);
    return;
  }

  savedClips.push(recentSearchResults[clipIndex]);
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);

  renderSavedClips(savedClips);
};
