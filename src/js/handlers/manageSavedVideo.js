import storage from '../storage/storage.js';
import searchResultView from '../views/searchResultView.js';

const content = 'unseen';

const changedVideoList = (changedData) => {
  storage.setLocalStorage(changedData);
  searchResultView.renderSavedVideos(content, changedData);
  if (changedData.length === 0) {
    storage.resetLocalStorage();
  }
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
