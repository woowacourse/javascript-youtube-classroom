import isWatchedMode from '../states/isWatchedMode.js';
import videoInfos from '../states/videoInfos.js';
import $ from '../utils/DOM.js';
import { renderSavedVideoList } from '../viewControllers/app.js';

function handleModeChange({ target }) {
  if (target.id === 'to-watch-video-display-button') {
    isWatchedMode.set(false);
    renderSavedVideoList(videoInfos.get(), isWatchedMode.get());
    target.classList.add('bg-cyan-100');
    $('#watched-video-display-button').classList.remove('bg-cyan-100');

    return;
  }
  if (target.id === 'watched-video-display-button') {
    isWatchedMode.set(true);
    renderSavedVideoList(videoInfos.get(), isWatchedMode.get());
    target.classList.add('bg-cyan-100');
    $('#to-watch-video-display-button').classList.remove('bg-cyan-100');
  }
}

export default handleModeChange;
