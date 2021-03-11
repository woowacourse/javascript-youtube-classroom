import { KEY_VIDEOS, WATCHING, WATCHING_SECTION } from '../constants.js';

import { getListByKey } from '../utils/localStorage.js';

export const isModalOpen = ($target) => {
  return $target.querySelector('.modal').classList.contains('open');
};

export const isModalDimmedArea = ($target) => {
  return $target.classList.contains('modal');
};

export const isModalCloseButton = ($target) => {
  return $target.closest('.js-modal-close-button');
};

export const isSavedVideo = (targetId) => {
  const videos = getListByKey(KEY_VIDEOS);

  return videos.some((video) => video.videoId === targetId);
};

export const isWatchingMenu = ($target) => {
  return $target.classList.contains(WATCHING_SECTION);
};

export const isWatchingVideo = ($target) => {
  return $target.classList.contains(WATCHING);
};
