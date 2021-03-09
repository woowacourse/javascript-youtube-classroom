import { EXCEED_SAVED_VIDEO_COUNT_MSG } from '../constants/alertMessage.js';
import { MAX_SAVED_VIDEO_COUNT } from '../constants/classroom.js';
import { cancelVideoSave, saveVideo } from '../service.js';
import videoInfos from '../states/videoInfos.js';
import { toggleSaveButton } from '../viewControllers/searchModal.js';

function handleVideoSave($saveButton) {
  if (videoInfos.size >= MAX_SAVED_VIDEO_COUNT) {
    alert(EXCEED_SAVED_VIDEO_COUNT_MSG);

    return;
  }

  saveVideo($saveButton.closest('.js-video'));
  toggleSaveButton($saveButton);
}

function handleVideoSaveCancel($saveCancelButton) {
  cancelVideoSave($saveCancelButton.closest('.js-video'));
  toggleSaveButton($saveCancelButton);
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
