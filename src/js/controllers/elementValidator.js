import { KEY_VIDEOS_WATCHING, KEY_VIDEOS_WATCHED, WATCHING_SECTION } from '../constants.js';

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
  return target.classList.contains(WATCHING_SECTION);
};
