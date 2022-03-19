import { $ } from '../util/dom.js';
import storage from '../storage/storage.js';
import searchResultView from '../views/searchResultView.js';

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

export const handleSaveVideos = (e) => {
  const isSaveButtonClick = e.target.classList.contains('video-item__save-button');
  if (!isSaveButtonClick) {
    return;
  }
  e.target.hidden = true;
  const videoData = selectedVideoData(e.target.closest('li'));
  storage.saveVideo(videoData);
  $('.empty-video-image').classList.add('hide');
  searchResultView.rendersavedVideo(videoData);
};
