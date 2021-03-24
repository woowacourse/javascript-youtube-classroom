import {
  MESSAGE,
  LOCAL_STORAGE_KEY,
  YOUTUBE,
  LOCAL_STORAGE_VALUE,
} from '../../../utils/constant.js';
import { renderSavedClip } from '../../../view/main.js';
import storage from '../../../utils/localStorage.js';
import { hideElement } from '../../../utils/setAttribute.js';
import { showSnackbar } from '../../../utils/showSnackbar.js';
import { renderSaveVideoCount } from '../../../view/modal.js';
import $DOM from '../../../utils/DOM.js';

export const onSaveClip = ({
  target,
  target: {
    dataset: { clipIndex, clipId },
  },
}) => {
  if (target.dataset.js !== 'save-button') {
    return;
  }

  const clipIndex = target.dataset.clipIndex;
  const clipId = target.dataset.clipId;
  const recentSearchResults =
    storage.get(LOCAL_STORAGE_KEY.RECENT_SEARCH_RESULTS) ?? [];
  const savedClip = recentSearchResults[clipIndex];
  savedClip.savedAt = Date.now();

  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) ?? {};
  const savedClipsLength = Object.keys(savedClips).length;
  if (savedClipsLength >= YOUTUBE.MAXIMUM_SAVE_CLIPS) {
    showSnackbar(MESSAGE.ERROR.EXCEED_MAXIMUM_CLIP_COUNT);
    return;
  }

  hideElement(target);
  hideElement($DOM.SAVE_PAGE.NOT_FOUND);

  savedClips[clipId] = savedClip;
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);

  showSnackbar(MESSAGE.NOTIFY.SAVE_CLIP);
  renderSavedClip(savedClip);
  renderSaveVideoCount(savedClips);
};
