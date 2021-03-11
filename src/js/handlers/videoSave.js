import {
  EXCEED_SAVED_VIDEO_COUNT_MSG,
  SAVE_SUCCESS_MSG,
  SAVE_CANCEL_SUCCESS_MSG,
} from '../constants/snackbarMessage.js';
import { MAX_SAVED_VIDEO_COUNT } from '../constants/classroom.js';
import { cancelVideoSave, saveVideo } from '../service.js';
import videoInfos from '../states/videoInfos.js';
import { renderSavedVideoList, showSnackBar } from '../viewControllers/app.js';
import {
  renderSavedVideoCount,
  toggleSaveButton,
} from '../viewControllers/searchModal.js';
import { VIDEO_SAVE_CANCEL_CONFIRM_MSG } from '../constants/confirmMessage.js';
import videoListType from '../states/videoListType.js';

function handleVideoSave($saveButton) {
  if (videoInfos.size >= MAX_SAVED_VIDEO_COUNT) {
    showSnackBar(EXCEED_SAVED_VIDEO_COUNT_MSG);

    return;
  }

  saveVideo($saveButton.closest('.js-video'));
  toggleSaveButton($saveButton);
  showSnackBar(SAVE_SUCCESS_MSG);

  renderSavedVideoCount(videoInfos.size);
  renderSavedVideoList(videoInfos.get(), videoListType.get());
}

function handleVideoSaveCancel($saveCancelButton) {
  if (!window.confirm(VIDEO_SAVE_CANCEL_CONFIRM_MSG)) return;

  cancelVideoSave($saveCancelButton.closest('.js-video'));
  toggleSaveButton($saveCancelButton);
  showSnackBar(SAVE_CANCEL_SUCCESS_MSG);

  renderSavedVideoList(videoInfos.get(), videoListType.get());
  renderSavedVideoCount(videoInfos.size);
}

function videoSaveManager({ target }) {
  if (target.classList.contains('js-save-button')) {
    handleVideoSave(target);

    return;
  }

  if (target.classList.contains('js-save-cancel-button')) {
    handleVideoSaveCancel(target);
  }
}

export default videoSaveManager;
