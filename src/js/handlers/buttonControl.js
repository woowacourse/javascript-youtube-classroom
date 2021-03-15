import MESSAGE from '../constants/message.js';
import videoInfos from '../states/videoInfos.js';
import videoListType from '../states/videoListType.js';
import {
  removeSavedVideo,
  showSnackBar,
  updateSavedVideo,
} from '../viewControllers/app.js';
import { renderSavedVideoCount } from '../viewControllers/searchModal.js';

function handleWatchedButton($target) {
  const $targetVideo = $target.closest('.js-video');

  videoInfos.toggleWatchType($targetVideo.dataset.videoId);
  showSnackBar(MESSAGE.SNACKBAR.MOVE_SUCCESS);

  renderSavedVideoCount(videoInfos.length);
  removeSavedVideo($targetVideo);
}

function handleDeleteButton($target) {
  if (!window.confirm(MESSAGE.CONFIRM.DELETE_VIDEO)) return;

  const $targetVideo = $target.closest('.js-video');

  videoInfos.remove($targetVideo.dataset.videoId);
  showSnackBar(MESSAGE.SNACKBAR.DELETE_SUCCESS);

  renderSavedVideoCount(videoInfos.length);
  removeSavedVideo($targetVideo);
}

function handleLikedButton($target) {
  const $targetVideo = $target.closest('.js-video');
  videoInfos.toggleLikeType($targetVideo.dataset.videoId);

  const $updateSavedVideo = updateSavedVideo($targetVideo);
  if (videoListType.get() === 'liked') {
    removeSavedVideo($updateSavedVideo);
  }
}

function handleButtonsControl({ target }) {
  if (target.classList.contains('js-watched-button')) {
    handleWatchedButton(target);
    return;
  }
  if (target.classList.contains('js-delete-button')) {
    handleDeleteButton(target);
    return;
  }
  if (target.classList.contains('js-like-button')) {
    handleLikedButton(target);
  }
}

export default handleButtonsControl;
