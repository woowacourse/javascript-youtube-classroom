import {
  $savedVideoWrapper,
  $likeVideoFilterCheckbox,
  $savedVideoUpIntersector,
  $savedVideoDownIntersector,
} from '../elements';
import { layoutView, savedVideoView } from '../view';
import savedVideoService from '../service/savedVideoService.js';
import { CONFIRM_MESSAGE, SELECTOR_CLASS, SNACKBAR_MESSAGE } from '../constants';
import { savedVideoFilter } from '../store.js';
import controllerUtil from './controllerUtil.js';
import filteredVideoService from '../service/filteredVideoService';

const savedVideoController = {
  initEventListeners() {
    $savedVideoWrapper.addEventListener('click', onClipInteract);
    $likeVideoFilterCheckbox.addEventListener('change', onFilterLikeClip);
    controllerUtil.setObserver($savedVideoUpIntersector, onSavedVideoUpIntersect);
    controllerUtil.setObserver($savedVideoDownIntersector, onSavedVideoDownIntersect);
  },
  renderFilteredVideos() {
    const filteredVideos = filteredVideoService.getFilteredVideos();
    if (filteredVideos.length === 0) {
      savedVideoView.showEmptyVideoImage();
      savedVideoView.eraseVideos();
      return;
    }
    savedVideoView.hideEmptyVideoImage();
    savedVideoView.showUpVideoIntersector();
    savedVideoView.showDownVideoIntersector();
    savedVideoView.renderVideos(filteredVideos);
  },
};

// 여기해야 함
function onSavedVideoUpIntersect() {
  const upSliceResult = filteredVideoService.tryUpSliceVideos();
  if (!upSliceResult) {
    return;
  }
  window.scrollTo({ top: window.scrollY + 300 });
  savedVideoController.renderFilteredVideos();
}

function onSavedVideoDownIntersect() {
  const downSliceResult = filteredVideoService.tryDownSliceVideos();
  if (!downSliceResult) {
    return;
  }
  window.scrollTo({ top: window.scrollY - 100 });
  savedVideoController.renderFilteredVideos();
}

function onFilterLikeClip({ target }) {
  if (target.checked) {
    filterLikeClips();
    return;
  }
  cancelLikeClipsFilter();
}

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
  if (target.classList.contains(SELECTOR_CLASS.SAVED_CLIP_LIKE_BUTTON)) {
    likeClip(target.dataset.videoId);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.SAVED_CLIP_CANCEL_LIKE_BUTTON)) {
    cancelClipLike(target.dataset.videoId);
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

function likeClip(videoId) {
  savedVideoService.likeVideo(videoId);
  savedVideoController.renderFilteredVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.VIDEO_LIKE_SUCCESS, true);
}

function cancelClipLike(videoId) {
  savedVideoService.cancelVideoLike(videoId);
  savedVideoController.renderFilteredVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.VIDEO_LIKE_CANCEL_SUCCESS, true);
}

function filterLikeClips() {
  savedVideoFilter.setLikedOnly();
  filteredVideoService.initVideoSliceIndex();
  savedVideoController.renderFilteredVideos();
}

function cancelLikeClipsFilter() {
  savedVideoFilter.setLikedNoMatter();
  filteredVideoService.initVideoSliceIndex();
  savedVideoController.renderFilteredVideos();
}

export default savedVideoController;
