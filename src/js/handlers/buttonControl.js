import { DELETE_VIDEO_CONFIRM_MSG } from '../constants/confirmMessage.js';
import {
  VIDEO_DELETE_SUCCESS_MSG,
  VIDEO_MOVE_SUCCESS_MSG,
} from '../constants/snackbarMessage.js';
import videoInfos from '../states/videoInfos.js';
import videoListType from '../states/videoListType.js';
import { renderSavedVideoList, showSnackBar } from '../viewControllers/app.js';
import {
  renderSavedVideoCount,
  updateModalSaveButton,
} from '../viewControllers/searchModal.js';

function handleWatchedButton($target) {
  const targetId = $target.closest('.js-video').dataset.videoId;

  videoInfos.toggleWatchType(targetId);
  renderSavedVideoList(videoInfos.get(), videoListType.get());
  showSnackBar(VIDEO_MOVE_SUCCESS_MSG);
}

function handleDeleteButton($target) {
  if (!window.confirm(DELETE_VIDEO_CONFIRM_MSG)) return;

  const targetId = $target.closest('.js-video').dataset.videoId;

  videoInfos.remove(targetId);
  renderSavedVideoCount(videoInfos.size);
  renderSavedVideoList(videoInfos.get(), videoListType.get());
  updateModalSaveButton(targetId);
  showSnackBar(VIDEO_DELETE_SUCCESS_MSG);
}

function handleButtonsControl({ target }) {
  if (target.classList.contains('js-watched-button')) {
    handleWatchedButton(target);
    return;
  }
  if (target.classList.contains('js-delete-button')) {
    handleDeleteButton(target);
  }
}

export default handleButtonsControl;
