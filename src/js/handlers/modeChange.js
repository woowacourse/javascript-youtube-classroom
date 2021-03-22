import videoListType from '../states/videoListType.js';
import videoInfos from '../states/videoInfos.js';
import {
  renderSavedVideoList,
  toggleFocusedModeButton,
} from '../viewControllers/app.js';

function toggleMode(targetId) {
  videoListType.toggle(targetId);

  renderSavedVideoList(videoInfos.get(), videoListType.get());
  toggleFocusedModeButton(targetId);
}

function handleModeChange({ target }) {
  if (
    (target.id === 'to-watch-video-display-button' &&
      videoListType.get() === 'watched') ||
    videoListType.get() === 'liked'
  ) {
    toggleMode(target.id);
    return;
  }
  if (
    (target.id === 'watched-video-display-button' &&
      videoListType.get() === 'toWatch') ||
    videoListType.get() === 'liked'
  ) {
    toggleMode(target.id);
    return;
  }
  if (target.id === 'liked-video-display-button') {
    toggleMode(target.id);
  }
}

export default handleModeChange;
