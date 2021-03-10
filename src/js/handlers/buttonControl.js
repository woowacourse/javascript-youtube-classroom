import videoInfos from '../states/videoInfos.js';
import { showSnackBar } from '../viewControllers/app.js';

function handleWatchedButton($target) {
  const targetId = $target.closest('.js-video').dataset.videoId;

  videoInfos.toggleIsWatched(targetId);
  showSnackBar('영상을 이동시켰습니다.');
}

function handleDeleteButton($target) {
  if (!window.confirm('해당 영상을 삭제하시겠습니까?')) return;

  const targetId = $target.closest('.js-video').dataset.videoId;

  videoInfos.remove(targetId);
  showSnackBar('해당 영상을 삭제하였습니다.');
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
