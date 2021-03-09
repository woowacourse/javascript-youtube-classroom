import storage from '../utils/localStorage.js';
import { LOCAL_STORAGE_KEY, CONFIRM_MESSAGE } from '../utils/constant.js';
import { hideElement } from '../utils/setAttribute.js';

const toggleIsWatched = (target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const targetClipIndex = targetClip.dataset.clipIndex;
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS);
  const isWatched = savedClips[targetClipIndex].isWatched;

  savedClips[targetClipIndex].isWatched = !isWatched;
  targetClip.setAttribute('data-is-watched', !isWatched);
  hideElement(targetClip);
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);
};

const deleteClip = (target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS);

  if (!confirm(CONFIRM_MESSAGE.DELETE_CLIP)) {
    return;
  }

  savedClips.splice(targetClip.dataset.clipIndex, 1);
  targetClip.setAttribute('data-is-deleted', true);
  hideElement(targetClip);
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);
};

const actions = {
  'saved-clip-button-container__check': (target) => toggleIsWatched(target),
  'saved-clip-button-container__delete': (target) => deleteClip(target),
};

export const onButtonContainer = ({ target }) => {
  actions[target.dataset.js] && actions[target.dataset.js](target);
};
