import { ELEMENTS } from '../constants/constants.js';
import storage from '../storage/storage.js';
import { renderSavedVideos, renderNoSaved } from '../views/savedVideoList.js';

let isVideoState = true;

const changedVideoList = (videoList) => {
  storage.setLocalStorage(videoList);
  if (videoList.length === 0) {
    renderNoSaved();
    storage.resetLocalStorage();
    return;
  }
  renderSavedVideos(isVideoState, videoList);
};

const selectedVideoData = (videoItem) => {
  const videoData = {
    videoId: videoItem.dataset.videoId,
    thumbnails: videoItem.querySelector('.video-item__thumbnail').src,
    title: videoItem.querySelector('.video-item__title').textContent,
    channelTitle: videoItem.querySelector('.video-item__channel-name').textContent,
    publishTime: videoItem.querySelector('.video-item__published-date').textContent,
    unseen: true,
  };
  return videoData;
};

export const handleSaveVideo = (selectedButton) => {
  selectedButton.hidden = true;
  const videoData = selectedVideoData(selectedButton.closest('li'));
  storage.saveVideo(videoData);
  renderSavedVideos(isVideoState, storage.getLocalStorage());
};

export const handleDeleteVideo = (selectedVideoId) => {
  const deletedVideoList = storage
    .getLocalStorage()
    .filter((video) => video.videoId !== selectedVideoId);
  changedVideoList(deletedVideoList);
};

export const handleWatchedVideo = (selectedVideoId) => {
  const changedVideosState = storage.getLocalStorage().map((video) => {
    if (video.videoId === selectedVideoId) {
      video.unseen = !video.unseen;
    }
    return video;
  });
  changedVideoList(changedVideosState);
};

export const handleWatchedContent = () => {
  ELEMENTS.UNSEEN_VIDEO_BUTTON.classList.remove('target');
  ELEMENTS.WATCHED_VIDEO_BUTTON.classList.add('target');
  isVideoState = false;
  initSavedVideos();
};

export const handleUnseenContent = () => {
  ELEMENTS.UNSEEN_VIDEO_BUTTON.classList.add('target');
  ELEMENTS.WATCHED_VIDEO_BUTTON.classList.remove('target');
  isVideoState = true;
  initSavedVideos();
};

export const initSavedVideos = () => {
  const savedVideos = storage.getLocalStorage();
  if (!savedVideos) {
    renderNoSaved();
    return;
  }
  renderSavedVideos(isVideoState, savedVideos);
};
