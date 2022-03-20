import { ELEMENTS } from '../constants/constants.js';
import ContentTarget from '../models/ContentTarget.js';
import storage from '../storage/storage.js';
import { renderSavedVideos, renderNoSaved } from '../views/savedVideoList.js';

const contentTarget = new ContentTarget();

const changedVideoList = (changedData) => {
  storage.setLocalStorage(changedData);
  if (changedData.length === 0) {
    renderNoSaved();
    storage.resetLocalStorage();
    return;
  }
  renderSavedVideos(contentTarget.currentTarget, changedData);
};

const selectedVideoData = (videoItem) => {
  const videoData = {
    videoId: videoItem.dataset.videoId,
    thumbnails: videoItem.querySelector('.video-item__thumbnail').src,
    title: videoItem.querySelector('.video-item__title').textContent,
    channelTitle: videoItem.querySelector('.video-item__channel-name').textContent,
    publishTime: videoItem.querySelector('.video-item__published-date').textContent,
    state: 'unseen',
  };
  return videoData;
};

export const handleSaveVideo = (e) => {
  const isSaveButtonClick = e.target.classList.contains('video-item__save-button');
  if (!isSaveButtonClick) {
    return;
  }
  e.target.hidden = true;
  const videoData = selectedVideoData(e.target.closest('li'));
  storage.saveVideo(videoData);
  renderSavedVideos(contentTarget.currentTarget, storage.getLocalStorage());
};

export const handleDeleteVideo = (selectedVideoId) => {
  const deletedData = storage
    .getLocalStorage()
    .filter((video) => video.videoId !== selectedVideoId);
  changedVideoList(deletedData);
};

export const handleWatchedVideo = (selectedVideoId) => {
  const savedVideos = storage.getLocalStorage();
  savedVideos.forEach((video) => {
    if (video.videoId === selectedVideoId) {
      if (video.state === 'watched') {
        video.state = 'unseen';
      } else {
        video.state = 'watched';
      }
    }
  });
  changedVideoList(savedVideos);
};

export const handleWatchedContent = () => {
  ELEMENTS.UNSEEN_VIDEO_BUTTON.classList.remove('target');
  ELEMENTS.WATCHED_VIDEO_BUTTON.classList.add('target');
  contentTarget.currentTarget = 'watched';
  initSavedVideos();
};

export const handleUnseenContent = () => {
  ELEMENTS.UNSEEN_VIDEO_BUTTON.classList.add('target');
  ELEMENTS.WATCHED_VIDEO_BUTTON.classList.remove('target');
  contentTarget.currentTarget = 'unseen';
  initSavedVideos();
};

export const initSavedVideos = () => {
  const savedVideos = storage.getLocalStorage();
  if (!savedVideos) {
    renderNoSaved();
    return;
  }
  renderSavedVideos(contentTarget.currentTarget, savedVideos);
};
