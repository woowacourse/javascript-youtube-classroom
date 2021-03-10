import storage from '../utils/localStorage.js';
import { LOCAL_STORAGE_KEY, MESSAGE } from '../utils/constant.js';
import { hideElement, showElement } from '../utils/setAttribute.js';
import { snackbar } from '../utils/snackbar.js';
import $DOM from '../utils/DOM.js';

const toggleIsWatched = (target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS);
  const targetClipIndex = targetClip.dataset.clipIndex;
  const isWatched = savedClips[targetClipIndex].isWatched;

  const notifyMessage = isWatched
    ? MESSAGE.NOTIFY.CHECK_WACTHED_CLIP
    : MESSAGE.NOTIFY.CHECK_UNWACTHED_CLIP;

  snackbar(notifyMessage);
  savedClips[targetClipIndex].isWatched = !isWatched;
  targetClip.setAttribute('data-is-watched', !isWatched);
  hideElement(targetClip);
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);
};

const deleteClip = (target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS);
  const targetClipIndex = targetClip.dataset.clipIndex;

  if (!confirm(MESSAGE.CONFIRM.DELETE_CLIP)) {
    return;
  }

  snackbar(MESSAGE.NOTIFY.DELETE_CLIP);
  savedClips[targetClipIndex].isDeleted = true;
  targetClip.setAttribute('data-is-deleted', true);
  hideElement(targetClip);

  const existClips = savedClips.filter((savedClip) => !savedClip.isDeleted);

  if (existClips.length === 0) {
    showElement($DOM.SAVE_PAGE.NOT_FOUND);
  }

  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);
};

const actions = {
  'saved-clip-button-container__check': (target) => toggleIsWatched(target),
  'saved-clip-button-container__delete': (target) => deleteClip(target),
};

export const onButtonContainer = ({ target }) => {
  actions[target.dataset.js] && actions[target.dataset.js](target);
};
