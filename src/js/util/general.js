import { ALERT, ERROR, SNACK_BAR_DELAY_TIME } from '../constants/constants.js';
import watchedVideoInterface from '../ui/watchedVideoInterface.js';
import watchLaterInterface from '../ui/watchLaterInterface.js';

export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const validateInput = input => {
  if (input === '') {
    throw new Error(ERROR.MESSAGE.EMPTY_INPUT);
  }
};

export const quickModalElement = e => {
  e.preventDefault();

  if (!$('.modal-container').classList.contains('hide')) {
    $('.modal-container').classList.toggle('hide');
    if ($('.watch-later-videos').classList.contains('hidden')) {
      watchedVideoInterface.renderWatchedVideos();
    }
    if ($('.watched-videos').classList.contains('hidden')) {
      watchLaterInterface.renderWatchLaterVideos();
    }
  }
};

export const toggleSnackBar = mention => {
  $('.snack-bar').textContent = mention;
  $('.snack-bar').classList.toggle('is-active');
  setTimeout(() => $('.snack-bar').classList.toggle('is-active'), SNACK_BAR_DELAY_TIME);
};

export const confrimVideoDelete = () => {
  return window.confirm(ALERT.MESSAGE.DELETE_CONFRIM);
};
