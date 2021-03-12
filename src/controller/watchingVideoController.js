import { $searchResultVideoWrapper, $watchingVideoWrapper } from '../elements';
import { watchedVideoModel, watchingVideoModel } from '../store';
import {
  layoutView,
  modalView,
  watchedVideoView,
  watchingVideoView,
} from '../view';
import watchingVideoService from '../service/watchingVideoService.js';
import {
  BROWSER_HASH,
  CONFIRM_MESSAGE,
  SELECTOR_CLASS,
  SNACKBAR_MESSAGE,
} from '../constants';
import controllerUtil from './controllerUtil';

const watchingVideoController = {
  initEventListeners() {
    $searchResultVideoWrapper.addEventListener('click', onWatchingVideoSave);
    $watchingVideoWrapper.addEventListener('click', onWatchingVideoInteract);
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

function onWatchingVideoSave({ target }) {
  if (!target.classList.contains(SELECTOR_CLASS.SEARCHED_CLIP_SAVE_BUTTON)) {
    return;
  }
  // TODO: watching + watched 비디오 합쳐서 100개 이하여야함
  if (!watchingVideoService.isVideoCountUnderLimit()) {
    layoutView.showSnackbar(SNACKBAR_MESSAGE.SAVE_LIMIT_EXCEEDED, false);
    return;
  }

  if (watchingVideoService.isVideosEmpty()) {
    watchingVideoView.hideEmptyVideoImage();
    watchedVideoView.hideEmptyVideoImage();
  }
  watchingVideoService.pushNewVideo(target.dataset);

  if (controllerUtil.parseHash(location.hash) === BROWSER_HASH.WATCHING) {
    watchingVideoView.renderVideos(watchingVideoModel.getItem());
  }
  modalView.hideVideoSaveButton(target);
  layoutView.showSnackbar(SNACKBAR_MESSAGE.WATCHING_VIDEO_SAVE_SUCCESS, true);
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
