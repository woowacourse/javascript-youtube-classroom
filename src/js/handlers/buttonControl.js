import { DELETE_VIDEO_CONFIRM_MSG } from '../constants/confirmMessage.js';
import {
  DELETE_SUCCESS_MSG,
  VIDEO_MOVE_SUCCESS_MSG,
} from '../constants/snackbarMessage.js';
import { videoInfos } from '../states/videoInfos.js';
import { showSnackBar } from '../viewControllers/app.js';

function handleWatchedButton($target) {
  const targetId = $target.closest('.js-video').dataset.videoId;

  videoInfos.toggleWatchType(targetId);
  showSnackBar(VIDEO_MOVE_SUCCESS_MSG);
}

function handleDeleteButton($target) {
  if (!window.confirm(DELETE_VIDEO_CONFIRM_MSG)) return;

  const targetId = $target.closest('.js-video').dataset.videoId;

  videoInfos.remove(targetId);
  showSnackBar(DELETE_SUCCESS_MSG);
}

export function handleButtonsControl({ target }) {
  if (target.classList.contains('js-watched-button')) {
    handleWatchedButton(target);
    return;
  }
  if (target.classList.contains('js-delete-button')) {
    handleDeleteButton(target);
  }
}
