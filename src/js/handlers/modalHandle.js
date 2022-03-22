import { $ } from '../utils/querySelector.js';
import mainPageUI from '../views/mainPage/mainPageUI.js';
import data from '../data/data.js';

export const handleModalClose = () => {
  $('.modal-container').classList.toggle('hide');
  $('#app').classList.toggle('wrapper');

  // 모달 초기화
  $('.video-list').replaceChildren();
  $('#search-input-keyword').value = '';
  $('.no-result').hidden = true;
  $('.suggestion').hidden = true;

  $('.saved-video-list').replaceChildren();
  mainPageUI.renderSavedVideoItems(data.savedVideos);
};
