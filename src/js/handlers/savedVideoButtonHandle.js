import { $ } from '../utils/querySelector.js';
import videoStorage from '../localStorage/videoStorage.js';

export const handleWatchedButtonClick = e => {
  const videoItem = e.target.parentElement.parentElement;
  videoItem.remove();
  const savedVideos = videoStorage.getSavedVideos();
  const newSavedVideos = savedVideos.map(savedVideo => {
    if (savedVideo.id === videoItem.dataset.videoId) {
      savedVideo.watched = true;
      return savedVideo;
    }
    return savedVideo;
  });
  videoStorage.setSavedVideos(newSavedVideos);
};

export const handleDeleteButtonClick = e => {
  const videoItem = e.target.parentElement.parentElement;
  videoItem.remove();
  const savedVideos = videoStorage.getSavedVideos();
  const newSavedVideos = savedVideos.filter(
    savedVideo => savedVideo.id !== videoItem.dataset.videoId,
  );
  if (newSavedVideos.length === 0) {
    videoStorage.removeSavedVideo();
    $('.saved-video').hidden = true;
    mainPageUI.renderNothingSavedImage();
    return;
  }
  videoStorage.setSavedVideos(newSavedVideos);
};
