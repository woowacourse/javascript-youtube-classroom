import { KEY_VIDEOS_WATCHING, KEY_VIDEOS_WATCHED } from '../constants.js';

import { getListByKey } from '../utils/localStorage.js';

export const isModalOpen = (currentTarget) => {
  return currentTarget.querySelector('.modal').classList.contains('open');
};

export const isModalDimmedArea = (target) => {
  return target.classList.contains('modal');
};

export const isModalCloseButton = (target) => {
  return target.closest('.js-modal-close-button');
};

export const isSavedVideo = (targetId) => {
  const videosWatching = getListByKey(KEY_VIDEOS_WATCHING);
  const videosWatched = getListByKey(KEY_VIDEOS_WATCHED);

  return (
    videosWatching.some((video) => video.videoId === targetId) ||
    videosWatched.some((video) => video.videoId === targetId)
  );
};

export const isWatchingMenu = (target) => {
  return target.contains('.watching');
};

export const isWatchedMenu = (target) => {
  return target.contains('.watched');
};
