import { $savedVideoWrapper } from '../elements';
import { layoutView, savedVideoView } from '../view';
import savedVideoService from '../service/savedVideoService.js';
import { CONFIRM_MESSAGE, SELECTOR_CLASS, SNACKBAR_MESSAGE } from '../constants';

const savedVideoController = {
  initEventListeners() {
    $savedVideoWrapper.addEventListener('click', onClipInteract);
  },
  renderFilteredVideos() {
    const filteredVideos = savedVideoService.getFilteredVideos();
    if (filteredVideos.length === 0) {
      savedVideoView.showEmptyVideoImage();
      savedVideoView.eraseVideos();
      return;
    }
    savedVideoView.hideEmptyVideoImage();
    savedVideoView.renderVideos(filteredVideos);
  },
};

function onClipInteract({ target }) {
  if (target.classList.contains(SELECTOR_CLASS.SAVED_CLIP_CHECK_BUTTON)) {
    checkClip(target.dataset.videoId);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.SAVED_CLIP_UNCHECK_BUTTON)) {
    unCheckClip(target.dataset.videoId);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.SAVED_CLIP_DELETE_BUTTON)) {
    deleteClip(target.dataset.videoId);
    return;
  }
}

function checkClip(videoId) {
  savedVideoService.checkVideo(videoId);
  savedVideoController.renderFilteredVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.VIDEO_CHECK_SUCCESS, true);
}

function unCheckClip(videoId) {
  savedVideoService.unCheckVideo(videoId);
  savedVideoController.renderFilteredVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.VIDEO_UNCHECK_SUCCESS, true);
}

function deleteClip(videoId) {
  if (!layoutView.confirm(CONFIRM_MESSAGE.VIDEO_DELETE)) {
    return;
  }
  savedVideoService.deleteVideo(videoId);
  savedVideoController.renderFilteredVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.VIDEO_DELETE_SUCCESS, true);
}

export default savedVideoController;
