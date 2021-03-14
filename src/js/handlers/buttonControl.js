import MESSAGE from '../constants/message.js';
import videoInfos from '../states/videoInfos.js';
import videoListType from '../states/videoListType.js';
import { renderSavedVideoList, showSnackBar } from '../viewControllers/app.js';
import { renderSavedVideoCount } from '../viewControllers/searchModal.js';

function handleWatchedButton($target) {
  const targetId = $target.closest('.js-video').dataset.videoId;

  videoInfos.toggleWatchType(targetId);
  showSnackBar(MESSAGE.SNACKBAR.MOVE_SUCCESS);

  renderSavedVideoList(videoInfos.get(), videoListType.get());
  renderSavedVideoCount(videoInfos.length);
}

function handleDeleteButton($target) {
  if (!window.confirm(MESSAGE.CONFIRM.DELETE_VIDEO)) return;

  const targetId = $target.closest('.js-video').dataset.videoId;

  videoInfos.remove(targetId);
  showSnackBar(MESSAGE.SNACKBAR.DELETE_SUCCESS);

  renderSavedVideoList(videoInfos.get(), videoListType.get());
  renderSavedVideoCount(videoInfos.length);
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
