import { getListFromDB } from '../utils/localStorage.js';
import { DB_KEY, CLASS_NAME } from '../constants.js';

export const isModalOpen = ($target) => {
  return $target.querySelector('.modal').classList.contains('open');
};

export const isModalDimmedArea = ($target) => {
  return $target.classList.contains('modal');
};

export const isModalCloseButton = ($target) => {
  return $target.closest('.js-modal-close-button');
};

export const isRecentKeywordLink = ($target) => {
  return $target.closest('.js-keyword-link');
};

export const isRecentKeywordRemoveButton = ($target) => {
  return $target.closest('.js-keyword-remove-button');
};

export const isSavedVideo = (targetId) => {
  const videos = getListFromDB(DB_KEY.VIDEOS);

  return videos.some((video) => video.videoId === targetId);
};

export const isWatchingMenu = ($target) => {
  return $target.classList.contains(CLASS_NAME.WATCHING_SECTION);
};

export const isWatchedMenu = ($target) => {
  return $target.classList.contains(CLASS_NAME.WATCHED_SECTION);
};

export const isLikedMenu = ($target) => {
  return $target.classList.contains(CLASS_NAME.LIKED_SECTION);
};

export const isWatchingVideo = ($target) => {
  return $target.classList.contains(CLASS_NAME.WATCHING);
};

export const isWatchedVideo = ($target) => {
  return $target.classList.contains(CLASS_NAME.WATCHED);
};

export const isLikedVideo = ($target) => {
  return $target.classList.contains(CLASS_NAME.LIKED);
};

export const isConfirmCancelButton = ($target) => {
  return $target.classList.contains('js-confirm-cancel');
};

export const isConfirmApproveButton = ($target) => {
  return $target.classList.contains('js-confirm-approve');
};
