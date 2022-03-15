import { ERROR, MAX_SAVED_VIDEOS_NUMBER } from '../constants/constants';

const storage = {
  setSavedVideos(video) {
    localStorage.setItem('saved-videos', JSON.stringify(video));
  },
  getSavedVideos() {
    return JSON.parse(localStorage.getItem('saved-videos'));
  },
  updateSavedVideos(saveTargetVideo) {
    const savedVideos = this.getSavedVideos();
    const TargetVideo = {
      id: saveTargetVideo.videoId,
    };

    if (!savedVideos) {
      this.setSavedVideos([TargetVideo]);
      return;
    }

    if (savedVideos.length > MAX_SAVED_VIDEOS_NUMBER) {
      throw new Error(ERROR.MESSAGE.OVER_MAX_SAVED_VIDEOS_NUMBER);
    }
    if (savedVideos.some(savedVideo => savedVideo.id === TargetVideo.id)) {
      throw new Error(ERROR.MESSAGE.ALREADY_SAVED_VIDEOS);
    }
    this.setSavedVideos([...savedVideos, TargetVideo]);
  },
};

export default storage;
