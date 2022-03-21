import { ALERT, ERROR, SNACK_BAR_DELAY_TIME } from '../constants/constants.js';
import watchedVideoView from '../ui/watchedVideoView.js';
import watchLaterView from '../ui/watchLaterView.js';

export const $ = selector => document.querySelector(selector);

export const $$ = selector => document.querySelectorAll(selector);

export const validateInput = input => {
  if (input === '') {
    throw new Error(ERROR.MESSAGE.EMPTY_INPUT);
  }
};

export const checkHasHiddenClass = selector => {
  return $(selector).classList.contains('hidden');
};

export const quickModalElement = e => {
  e.preventDefault();
  if (!checkHasHiddenClass('.modal-container')) {
    $('.modal-container').classList.toggle('hidden');
    if (checkHasHiddenClass('.watch-later-videos')) {
      watchedVideoView.renderWatchedVideos();
    }
    if (checkHasHiddenClass('.watched-videos')) {
      watchLaterView.renderWatchLaterVideos();
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
