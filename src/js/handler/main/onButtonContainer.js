import storage from '../../utils/localStorage.js';
import { LOCAL_STORAGE_KEY, MESSAGE } from '../../utils/constant.js';
import { showElement } from '../../utils/setAttribute.js';
import { showSnackbar } from '../../utils/showSnackbar.js';
import $DOM from '../../utils/DOM.js';

const addWatchedClip = (targetClip) => {
  targetClip.classList.add('watched-clip');
  targetClip.classList.remove('unwatched-clip');

  showSnackbar(MESSAGE.NOTIFY.CHECK_UNWACTHED_CLIP);
};

const removeWatchedClip = (targetClip) => {
  targetClip.classList.add('unwatched-clip');
  targetClip.classList.remove('watched-clip');

  showSnackbar(MESSAGE.NOTIFY.CHECK_WACTHED_CLIP);
};

const watchedClip = (target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const targetClipIndex = targetClip.dataset.clipIndex;
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS);
  const isWatched = savedClips[targetClipIndex].isWatched ?? true;

  savedClips[targetClipIndex].isWatched = !isWatched;
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);

  if (isWatched) {
    removeWatchedClip(targetClip);
    return;
  }
  addWatchedClip(targetClip);
};

const addLikeClip = (targetClip) => {
  targetClip.classList.add('like-clip');
  showSnackbar(MESSAGE.NOTIFY.LIKE_CLIP);
};

const removeLikeClip = (targetClip) => {
  targetClip.classList.remove('like-clip');
  showSnackbar(MESSAGE.NOTIFY.UNLIKE_CLIP);
};

const likeClip = (target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const targetClipIndex = targetClip.dataset.clipIndex;
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS);
  const isLiked = savedClips[targetClipIndex].isLiked ?? true;

  savedClips[targetClipIndex].isLiked = !isLiked;
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);

  if (isLiked) {
    addLikeClip(targetClip);
    return;
  }
  removeLikeClip(targetClip);
};

const deleteClip = (target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS);
  const targetClipIndex = targetClip.dataset.clipIndex;

  if (!confirm(MESSAGE.CONFIRM.DELETE_CLIP)) {
    return;
  }

  showSnackbar(MESSAGE.NOTIFY.DELETE_CLIP);
  savedClips[targetClipIndex].isDeleted = true;
  targetClip.classList.add('deleted-clip');

  const existClips = savedClips.filter((savedClip) => !savedClip.isDeleted);

  if (existClips.length === 0) {
    showElement($DOM.SAVE_PAGE.NOT_FOUND);
  }

  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);
};

export const onButtonContainer = ({ target }) => {
  if (target.dataset.js === 'saved-clip-button-container__check') {
    watchedClip(target);
    return;
  }

  if (target.dataset.js === 'saved-clip-button-container__like') {
    likeClip(target);
    return;
  }

  if (target.dataset.js === 'saved-clip-button-container__delete') {
    deleteClip(target);
  }
};
