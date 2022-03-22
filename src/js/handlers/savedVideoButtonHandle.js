import { $ } from '../utils/querySelector.js';
import videoStorage from '../localStorage/videoStorage.js';
import mainPageUI from '../views/mainPage/mainPageUI.js';

export const handleWatchedButtonClick = e => {
  const targetVideo = e.target.parentElement.parentElement;
  const savedVideos = videoStorage.getSavedVideos();

  const newSavedVideos = savedVideos.map(savedVideo => {
    if (savedVideo.id === targetVideo.dataset.videoId) {
      savedVideo.watched = true;
      return savedVideo;
    }
    return savedVideo;
  });
  videoStorage.setSavedVideos(newSavedVideos);

  targetVideo.remove();
};

export const handleDeleteButtonClick = e => {
  if (confirm('정말로 삭제하시겠습니까?')) {
    const targetVideo = e.target.parentElement.parentElement;
    const savedVideos = videoStorage.getSavedVideos();

    const newSavedVideos = savedVideos.filter(
      savedVideo => savedVideo.id !== targetVideo.dataset.videoId,
    );

    const noVideo = newSavedVideos.length === 0;
    if (noVideo) {
      videoStorage.removeSavedVideo();

      $('.saved-video').hidden = true;
      mainPageUI.renderNothingSavedImage();
      return;
    }

    videoStorage.setSavedVideos(newSavedVideos);

    targetVideo.remove();
  }
};
