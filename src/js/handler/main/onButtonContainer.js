import storage from '../../utils/localStorage.js';
import { LOCAL_STORAGE_KEY, MESSAGE } from '../../utils/constant.js';
import { hideElement, showElement } from '../../utils/setAttribute.js';
import { showSnackbar } from '../../utils/showSnackbar.js';
import $DOM from '../../utils/DOM.js';
import { $$ } from '../../utils/querySelector.js';
import { isEmptyDisplayClipCountFromCurrentTab } from '../shared/isEmptyDisplayClipCountFromCurrentTab.js';

const toggleIsWatched = (savedClips, target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const targetClipId = targetClip.dataset.clipId;
  const isWatched = savedClips[targetClipId].isWatched;

  const notifyMessage = isWatched
    ? MESSAGE.NOTIFY.CHECK_UNWACTHED_CLIP
    : MESSAGE.NOTIFY.CHECK_WACTHED_CLIP;

  showSnackbar(notifyMessage);

  if ($$('.watched-clip').length === 0) {
    showElement($DOM.SAVE_PAGE.NOT_FOUND);
  }

  savedClips[targetClipId].isWatched = !isWatched;
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);

  targetClip.classList.toggle('watched-clip');
  targetClip.classList.toggle('unwatched-clip');
  target.classList.toggle('opacity-hover');
};

const deleteClip = (savedClips, target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const targetClipId = targetClip.dataset.clipId;

  if (!confirm(MESSAGE.CONFIRM.DELETE_CLIP)) {
    return;
  }

  showSnackbar(MESSAGE.NOTIFY.DELETE_CLIP);
  delete savedClips[targetClipId];

  const savedClipsLength = Object.keys(savedClips).length;

  if (savedClipsLength === 0) {
    showElement($DOM.SAVE_PAGE.NOT_FOUND);
  }

  targetClip.remove();
  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);
};

const likeClip = (savedClips, target) => {
  const targetClip = target.closest('[data-js="saved-page__clip"]');
  const targetClipId = targetClip.dataset.clipId;
  const isLiked = savedClips[targetClipId].isLiked;

  const notifyMessage = isLiked
    ? MESSAGE.NOTIFY.UNLIKE_CLIP
    : MESSAGE.NOTIFY.LIKE_CLIP;

  showSnackbar(notifyMessage);

  savedClips[targetClipId].isLiked = !isLiked;
  targetClip.classList.toggle('liked-clip');
  targetClip.classList.toggle('unliked-clip');
  target.classList.toggle('opacity-hover');

  storage.set(LOCAL_STORAGE_KEY.SAVED_CLIPS, savedClips);
};

export const onButtonContainer = ({ target }) => {
  const savedClips = storage.get(LOCAL_STORAGE_KEY.SAVED_CLIPS) || {};

  if (target.dataset.js === 'saved-clip-button-container__check') {
    toggleIsWatched(savedClips, target);
  }

  if (target.dataset.js === 'saved-clip-button-container__delete') {
    deleteClip(savedClips, target);
  }

  if (target.dataset.js === 'saved-clip-button-container__like') {
    likeClip(savedClips, target);
  }

  const currentTab = storage.get(LOCAL_STORAGE_KEY.CURRENT_TAB) || '볼 영상';
  if (isEmptyDisplayClipCountFromCurrentTab[currentTab](savedClips)) {
    showElement($DOM.SAVE_PAGE.NOT_FOUND);
    return;
  }

  hideElement($DOM.SAVE_PAGE.NOT_FOUND);
};
