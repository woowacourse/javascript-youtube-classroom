const LOCAL_STORAGE_KEY__SAVED_VIDEO = 'saved-videos';

const videoStorage = {
  setSavedVideos(video) {
    localStorage.setItem(LOCAL_STORAGE_KEY__SAVED_VIDEO, JSON.stringify(video));
  },
  getSavedVideos() {
    const savedVideos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY__SAVED_VIDEO));
    if (savedVideos) return false;
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY__SAVED_VIDEO));
  },
  removeSavedVideo() {
    localStorage.removeItem(LOCAL_STORAGE_KEY__SAVED_VIDEO);
  },
};

export default videoStorage;
