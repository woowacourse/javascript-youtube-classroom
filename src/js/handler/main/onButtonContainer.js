import storage from '../../utils/localStorage.js';
import { LOCAL_STORAGE_KEY, MESSAGE } from '../../utils/constant.js';
import { showElement } from '../../utils/setAttribute.js';
import { showSnackbar } from '../../utils/showSnackbar.js';
import $DOM from '../../utils/DOM.js';

const toggleIsWatched = (target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS);
  const targetClipIndex = targetClip.dataset.clipIndex;
  const isWatched = savedClips[targetClipIndex].isWatched;

  const notifyMessage = isWatched
    ? MESSAGE.NOTIFY.CHECK_UNWACTHED_CLIP
    : MESSAGE.NOTIFY.CHECK_WACTHED_CLIP;

  showSnackbar(notifyMessage);

  savedClips[targetClipIndex].isWatched = !isWatched;
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);

  targetClip.classList.toggle('watched-clip');
  targetClip.classList.toggle('unwatched-clip');
  target.classList.toggle('opacity-hover');
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

const likeClip = (target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS);
  const targetClipIndex = targetClip.dataset.clipIndex;
  const isLiked = savedClips[targetClipIndex].isLiked;

  const notifyMessage = isLiked
    ? MESSAGE.NOTIFY.UNLIKE_CLIP
    : MESSAGE.NOTIFY.LIKE_CLIP;

  showSnackbar(notifyMessage);

  savedClips[targetClipIndex].isLiked = !isLiked;
  targetClip.classList.toggle('liked-clip');
  targetClip.classList.toggle('unliked-clip');
  target.classList.toggle('opacity-hover');

  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);
};

export const onButtonContainer = ({ target }) => {
  if (target.dataset.js === 'saved-clip-button-container__check') {
    toggleIsWatched(target);
    return;
  }

  if (target.dataset.js === 'saved-clip-button-container__delete') {
    deleteClip(target);
    return;
  }

  if (target.dataset.js === 'saved-clip-button-container__like') {
    likeClip(target);
    return;
  }
};
