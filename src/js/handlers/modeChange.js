import videoListType from '../states/videoListType.js';
import videoInfos from '../states/videoInfos.js';
import {
  renderSavedVideoList,
  toggleFocusedModeButton,
} from '../viewControllers/app.js';
import { TO_WATCH_TYPE, WATCHED_TYPE } from '../constants/filterType.js';

function toggleMode() {
  videoListType.toggle();
  renderSavedVideoList(videoInfos.get(), videoListType.get());
  toggleFocusedModeButton();
}

function handleModeChange({ target }) {
  if (
    target.id === 'to-watch-video-display-button' &&
    videoListType.get() === WATCHED_TYPE
  ) {
    toggleMode();
    return;
  }
  if (
    target.id === 'watched-video-display-button' &&
    videoListType.get() === TO_WATCH_TYPE
  ) {
    toggleMode();
  }
}

export default handleModeChange;
