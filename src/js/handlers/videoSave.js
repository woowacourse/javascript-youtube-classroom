import MESSAGE from '../constants/message.js';
import { MAX_SAVED_VIDEO_COUNT } from '../constants/classroom.js';
import { cancelVideoSave, saveVideo } from '../service.js';
import videoInfos from '../states/videoInfos.js';
import {
  appendSavedVideo,
  removeSavedVideo,
  showSnackBar,
} from '../viewControllers/app.js';
import {
  renderSavedVideoCount,
  toggleSaveButton,
} from '../viewControllers/searchModal.js';
import videoListType from '../states/videoListType.js';
import { $$ } from '../utils/DOM.js';

function handleVideoSave($saveButton) {
  if (videoInfos.length >= MAX_SAVED_VIDEO_COUNT) {
    showSnackBar(MESSAGE.SNACKBAR.EXCEED_SAVED_VIDEO_COUNT);

    return;
  }

  saveVideo($saveButton.closest('.js-video'));
  toggleSaveButton($saveButton);
  showSnackBar(MESSAGE.SNACKBAR.SAVE_SUCCESS);

  renderSavedVideoCount(videoInfos.length);
  appendSavedVideo(
    videoInfos.get()[videoInfos.length - 1],
    videoListType.get()
  );
}

function handleVideoSaveCancel($saveCancelButton) {
  if (!window.confirm(MESSAGE.CONFIRM.CANCEL_TO_SAVE_VIDEO)) return;
  cancelVideoSave($saveCancelButton.closest('.js-video'));
  toggleSaveButton($saveCancelButton);
  showSnackBar(MESSAGE.SNACKBAR.CANCEL_TO_SAVE);

  const [$targetVideo] = [...$$('#video-list .js-video')].filter(
    $video =>
      $video.dataset.videoId ===
      $saveCancelButton.closest('.js-video').dataset.videoId
  );

  renderSavedVideoCount(videoInfos.length);
  removeSavedVideo($targetVideo);
}

function handleVideoSaveControl({ target }) {
  if (target.classList.contains('js-save-button')) {
    handleVideoSave(target);

    return;
  }

  if (target.classList.contains('js-save-cancel-button')) {
    handleVideoSaveCancel(target);
  }
}

export default handleVideoSaveControl;
