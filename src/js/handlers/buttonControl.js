import videoInfos from '../states/videoInfos.js';

function handleWatchedButton($target) {
  const targetId = $target.closest('.js-video').dataset.videoId;

  videoInfos.toggleIsWatched(targetId);
}

function handleDeleteButton($target) {
  const targetId = $target.closest('.js-video').dataset.videoId;

  videoInfos.remove(targetId);
}

function handleButtonsControl({ target }) {
  if (target.classList.contains('js-watched-button')) {
    handleWatchedButton(target);
    return;
  }
  if (target.classList.contains('js-delete-button')) {
    handleDeleteButton(target);
  }
}

export default handleButtonsControl;
