import { videoListType } from '../states/videoListType.js';
import { videoInfos } from '../states/videoInfos.js';
import {
  renderSavedVideoList,
  toggleFocusedModeButton,
} from '../viewControllers/app.js';

function toggleMode() {
  videoListType.toggle();
  renderSavedVideoList(videoInfos.get(), videoListType.get());
  toggleFocusedModeButton();
}

export function handleModeChange({ target }) {
  if (
    target.id === 'to-watch-video-display-button' &&
    videoListType.get() === 'watched'
  ) {
    toggleMode();
    return;
  }
  if (
    target.id === 'watched-video-display-button' &&
    videoListType.get() === 'toWatch'
  ) {
    toggleMode();
  }
}
