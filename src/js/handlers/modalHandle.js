import { $ } from '../utils/querySelector.js';
import mainPageUI from '../ui/mainPage/mainPageUI.js';
import videoStorage from '../localStorage/videoStorage.js';

export const handleModalClose = () => {
  $('.modal-container').classList.toggle('hide');

  // 모달 초기화
  $('.video-list').replaceChildren();
  $('#search-input-keyword').value = '';

  $('.saved-video-list').replaceChildren();
  const savedVideos = videoStorage.getSavedVideos();
  mainPageUI.renderSavedVideoItems(savedVideos);
};
