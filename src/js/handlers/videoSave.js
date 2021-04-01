import {
  EXCEED_SAVED_VIDEO_COUNT_MSG,
  SAVE_SUCCESS_MSG,
  SAVE_CANCEL_SUCCESS_MSG,
} from '../constants/snackbarMessage.js';
import { MAX_SAVED_VIDEO_COUNT } from '../constants/classroom.js';
import { cancelVideoSave, saveVideo } from '../service.js';
import videoInfos from '../states/videoInfos.js';
import { snackBar } from '../viewControllers/app.js';
import { toggleSaveButton } from '../viewControllers/searchModal.js';
import { VIDEO_SAVE_CANCEL_CONFIRM_MSG } from '../constants/confirmMessage.js';

function handleVideoSave($saveButton) {
  const showSnackBar = snackBar();
  if (videoInfos.size >= MAX_SAVED_VIDEO_COUNT) {
    showSnackBar(EXCEED_SAVED_VIDEO_COUNT_MSG);

    return;
  }

  saveVideo($saveButton.closest('.js-video'));
  showSnackBar(SAVE_SUCCESS_MSG);
}

function handleVideoSaveCancel($saveCancelButton) {
  if (!window.confirm(VIDEO_SAVE_CANCEL_CONFIRM_MSG)) return;

  const showSnackBar = snackBar();

  cancelVideoSave($saveCancelButton.closest('.js-video'));
  showSnackBar(SAVE_CANCEL_SUCCESS_MSG);
}

function videoSaveManager({ target }) {
  if (
    !target.classList.contains('js-save-button') &&
    !target.classList.contains('js-save-cancel-button')
  )
    return;

  if (target.classList.contains('js-save-button')) {
    handleVideoSave(target);
  }
  if (target.classList.contains('js-save-cancel-button')) {
    handleVideoSaveCancel(target);
  }

  toggleSaveButton(target);
}

export default videoSaveManager;
