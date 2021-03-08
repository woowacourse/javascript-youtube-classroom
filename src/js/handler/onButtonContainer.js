import storage from '../utils/localStorage.js';
import { LOCAL_STORAGE_KEY } from '../utils/constant.js';
import { hideElement } from '../utils/setAttribute.js';

const toggleIsWatched = (target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const targetClipIndex = targetClip.dataset.clipIndex;
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS);
  const isWatched = savedClips[targetClipIndex].isWatched;

  savedClips[targetClipIndex].isWatched = !isWatched;
  targetClip.dataset.iswatched = !isWatched;
  hideElement(targetClip);
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);
};

const actions = {
  'saved-clip-button-container__check': (target) => toggleIsWatched(target),
  'saved-clip-button-container__delete': () => console.log('delete'),
};

export const onButtonContainer = ({ target }) => {
  actions[target.dataset.js] && actions[target.dataset.js](target);
};
