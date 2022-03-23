import { $ } from '../utils/querySelector.js';
import mainPageUI from '../views/mainPage/mainPageUI.js';
import data from '../data/data.js';

export const handleGonnaWatchToggleClick = () => {
  $('#gonna-watch-button').classList.add('checked');
  $('#watched-button').classList.remove('checked');
  $('.saved-video-list').classList.remove('watched-list');
  $('.saved-video-list').replaceChildren();
  mainPageUI.renderSavedVideoItems(data.savedVideos);
};

export const handleWatchedToggleClick = () => {
  $('#watched-button').classList.add('checked');
  $('#gonna-watch-button').classList.remove('checked');
  $('.saved-video-list').classList.add('watched-list');
  $('.saved-video-list').replaceChildren();

  mainPageUI.renderSavedVideoItems(data.savedVideos);
};
