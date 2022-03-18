import { $ } from '../../utils/querySelector.js';
import {
  handleGonnaWatchToggleClick,
  handleWatchedToggleClick,
} from '../../handlers/showSavedVideosHandle.js';
import {
  handleWatchedButtonClick,
  handleDeleteButtonClick,
} from '../../handlers/savedVideoButtonHandle.js';

const bindMainPageEvents = () => {
  $('#gonna-watch-button').addEventListener('click', handleGonnaWatchToggleClick);

  $('#watched-button').addEventListener('click', handleWatchedToggleClick);

  $('.saved-video-list').addEventListener('click', e => {
    const isWatchedButtonClick = e.target.classList.contains('video-item__watched-button');
    const isDeleteButtonClick = e.target.classList.contains('video-item__delete-button');

    if (isWatchedButtonClick) {
      handleWatchedButtonClick(e);
    }
    if (isDeleteButtonClick) {
      handleDeleteButtonClick(e);
    }
  });
};

export default bindMainPageEvents;
