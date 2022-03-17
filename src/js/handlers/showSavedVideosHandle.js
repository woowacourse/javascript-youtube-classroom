import { $ } from '../utils/querySelector.js';
import mainPageUI from '../ui/mainPage/mainPageUI.js';
import videoStorage from '../localStorage/videoStorage.js';

export const handleGonnaWatchToggleClick = () => {
  $('#gonna-watch-button').classList.add('checked');
  $('#watched-button').classList.remove('checked');
  $('.saved-video-list').classList.remove('watched-list');
  $('.saved-video-list').replaceChildren();

  const savedVideos = videoStorage.getSavedVideos();
  mainPageUI.renderSavedVideoItems(savedVideos);
};

export const handleWatchedToggleClick = () => {
  $('#watched-button').classList.add('checked');
  $('#gonna-watch-button').classList.remove('checked');
  $('.saved-video-list').classList.add('watched-list');
  $('.saved-video-list').replaceChildren();

  const savedVideos = videoStorage.getSavedVideos();
  mainPageUI.renderSavedVideoItems(savedVideos);
};
