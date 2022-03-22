import { $ } from '../utils/querySelector.js';
import videoStorage from '../localStorage/videoStorage.js';
import mainPageUI from '../views/mainPage/mainPageUI.js';
import data from '../data/data.js';

export const handleWatchedButtonClick = e => {
  const targetVideo = e.target.parentElement.parentElement;

  const newSavedVideos = data.savedVideos.map(savedVideo => {
    if (savedVideo.id === targetVideo.dataset.videoId) {
      savedVideo.watched = true;
      return savedVideo;
    }
    return savedVideo;
  });

  data.savedVideos = newSavedVideos;
  videoStorage.setSavedVideos(newSavedVideos);

  targetVideo.remove();
};

export const handleDeleteButtonClick = e => {
  const targetVideo = e.target.parentElement.parentElement;
  if (confirm('정말로 삭제하시겠습니까?')) {
    const newSavedVideos = data.savedVideos.filter(
      savedVideo => savedVideo.id !== targetVideo.dataset.videoId,
    );

    const noVideo = newSavedVideos.length === 0;
    if (noVideo) {
      videoStorage.removeSavedVideo();

      $('.saved-video').hidden = true;
      mainPageUI.renderNothingSavedImage();
      return;
    }

    data.savedVideos = newSavedVideos;
    videoStorage.setSavedVideos(newSavedVideos);

    targetVideo.remove();
  }
};
