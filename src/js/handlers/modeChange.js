import videoListType from '../states/videoListType.js';
import {
  renderSavedVideoList,
  changeFocusedModeButton,
} from '../viewControllers/app.js';
import {
  LIKED_TYPE,
  TO_WATCH_TYPE,
  WATCHED_TYPE,
} from '../constants/filterType.js';

function changeMode(type) {
  videoListType.set(type);
  renderSavedVideoList();
  changeFocusedModeButton(type);
}

function handleModeChange({ target }) {
  if (target.id === 'to-watch-video-display-button') {
    changeMode(TO_WATCH_TYPE);
    return;
  }
  if (target.id === 'watched-video-display-button') {
    changeMode(WATCHED_TYPE);
  }
  if (target.id === 'watched-video-display-button') {
    changeMode(LIKED_TYPE);
  }
}

export default handleModeChange;
