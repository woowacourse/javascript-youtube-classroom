import { EXCEED_SAVED_VIDEO_COUNT_MSG } from '../constants/alertMessage.js';
import { MAX_SAVED_VIDEO_COUNT } from '../constants/classroom.js';
import { cancelVideoSave, saveVideo } from '../service.js';
import videoInfos from '../states/videoInfos.js';
import { showSnackBar } from '../viewControllers/app.js';
import { toggleSaveButton } from '../viewControllers/searchModal.js';

function handleVideoSave($saveButton) {
  if (videoInfos.size >= MAX_SAVED_VIDEO_COUNT) {
    alert(EXCEED_SAVED_VIDEO_COUNT_MSG);

    return;
  }

  saveVideo($saveButton.closest('.js-video'));
  toggleSaveButton($saveButton);
  showSnackBar('성공적으로 저장하였습니다.');
}

function handleVideoSaveCancel($saveCancelButton) {
  if (!window.confirm('저장을 취소하시겠습니까?')) return;

  cancelVideoSave($saveCancelButton.closest('.js-video'));
  toggleSaveButton($saveCancelButton);
  showSnackBar('저장을 취소하였습니다.');
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
