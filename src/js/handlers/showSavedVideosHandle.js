import { $ } from '../util/querySelector.js';
import mainPageUI from '../ui/mainPage/mainPageUI.js';
import videoStorage from '../localStorage/videoStorage.js';

export const handleGoingWatchButtonClick = () => {
  $('#going-watch-button').classList.add('checked');
  $('#watched-button').classList.remove('checked');
  $('.saved-video-list').classList.remove('watched-list');
  $('.saved-video-list').replaceChildren();

  const savedVideos = videoStorage.getSavedVideos();
  mainPageUI.renderSavedVideos(savedVideos);
};

export const handleWatchedButtonClick = () => {
  $('#watched-button').classList.add('checked');
  $('#going-watch-button').classList.remove('checked');
  $('.saved-video-list').classList.add('watched-list');
  $('.saved-video-list').replaceChildren();

  const savedVideos = videoStorage.getSavedVideos();
  mainPageUI.renderSavedVideos(savedVideos);
};
