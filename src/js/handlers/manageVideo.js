import { ELEMENTS } from '../constants/constants.js';
import storage from '../storage/storage.js';
import { rendersavedVideo, renderSavedVideos } from '../views/savedVideoList.js';

const content = 'unseen';

const changedVideoList = (changedData) => {
  storage.setLocalStorage(changedData);
  renderSavedVideos(content, changedData);
  if (changedData.length === 0) {
    storage.resetLocalStorage();
  }
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
  ELEMENTS.EMPTY_VIDEO_IMAGE.classList.add('hide');
  rendersavedVideo(videoData);
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
      // eslint-disable-next-line no-param-reassign
      video.state = 'watched';
    }
  });
  changedVideoList(savedVideos);
};
