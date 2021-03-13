import { $searchResultVideoWrapper, $watchingVideoWrapper } from '../elements';
import { watchedVideoModel, watchingVideoModel } from '../store';
import {
  layoutView,
  watchedVideoView,
  watchingVideoView,
} from '../view';
import watchingVideoService from '../service/watchingVideoService.js';
import {
  CONFIRM_MESSAGE,
  SELECTOR_CLASS,
  SNACKBAR_MESSAGE,
} from '../constants';

const watchingVideoController = {
  initEventListeners() {
    $watchingVideoWrapper.addEventListener('click', onWatchingVideoInteract);
  },
  loadVideos() {
    const watchedVideos = watchedVideoModel.getItem();
    if (watchedVideos.length === 0) {
      watchingVideoView.hideEmptyVideoImage();
      watchedVideoView.showEmptyVideoImage();
    }
    watchedVideoView.renderVideos(watchedVideos);
  },
};

function onWatchingVideoInteract({ target }) {
  if (target.classList.contains(SELECTOR_CLASS.CLIP_CHECK_BUTTON)) {
    onClipCheck(target);
    return;
  }
  if (target.classList.contains(SELECTOR_CLASS.CLIP_DELETE_BUTTON)) {
    onWatchingVideoDelete(target);
    return;
  }
}

function onClipCheck(button) {
  const videoId = button.dataset.videoId;
  watchingVideoModel.sendVideoTo(watchedVideoModel, videoId);

  // TODO: controller를 클래스로 나누면 해결됨(아래 중복코드)
  loadWatchingVideos();

  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHED_VIDEO_CHECK_SUCCESS, true);
}

function onWatchingVideoDelete(button) {
  if (!layoutView.confirm(CONFIRM_MESSAGE.WATCHING_VIDEO_DELETE)) {
    return;
  }
  const videoId = button.dataset.videoId;
  watchingVideoModel.popVideoByVideoId(videoId);
  loadWatchingVideos();
  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_DELETE_SUCCESS, true);
}

function loadWatchingVideos() {
  const watchingVideos = watchingVideoModel.getItem();
  if (watchingVideoService.isVideosEmpty()) {
    watchingVideoView.showEmptyVideoImage();
    watchedVideoView.hideEmptyVideoImage();
  }
  watchingVideoView.renderVideos(watchingVideos);
}

export default watchingVideoController;
