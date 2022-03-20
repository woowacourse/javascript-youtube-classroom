import { STORAGE_KEY, MESSAGE, MAX_SAVE_COUNT } from '../constants';

export const video = {
  formatter(datasetElementsArray) {
    const datasetObject = datasetElementsArray.reduce((acc, val) => ({ ...acc, ...val }), {});
    const formattedObject = { ...datasetObject, watched: false };

    return formattedObject;
  },

  save(videoData) {
    try {
      const savedVideoList = this.getVideoList();
      if (savedVideoList.length >= MAX_SAVE_COUNT) {
        throw new Error(MESSAGE.ERROR_EXCESS_SAVE_COUNT);
      }
      savedVideoList.push(videoData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedVideoList));
    } catch (error) {
      throw new Error(error);
    }
  },

  check(videoId) {
    const savedVideoList = this.getVideoList();
    const updatedVideoList = savedVideoList.map(savedVideo => {
      if (savedVideo.videoId === videoId) {
        savedVideo.watched = true;
      }
      return savedVideo;
    });
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideoList));
  },

  remove(videoId) {
    const savedVideoList = this.getVideoList();
    const updatedVideoList = savedVideoList.filter(savedVideo => savedVideo.videoId !== videoId);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideoList));
  },

  getVideoList() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  },
};
