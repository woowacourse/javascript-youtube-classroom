import { STORAGE_KEY, MESSAGE, MAX_SAVE_COUNT } from '../constants';

export const video = {
  formatter(datasetElementsArray) {
    return {
      ...datasetElementsArray[0],
      ...datasetElementsArray[1],
      ...datasetElementsArray[2],
      ...datasetElementsArray[3],
      ...datasetElementsArray[4],
      watched: false,
    };
  },

  save(videoData) {
    try {
      const savedVideoList = this.get();
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
    const savedVideoList = this.get();
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
    const savedVideoList = this.get();
    const updatedVideoList = savedVideoList.filter(savedVideo => savedVideo.videoId !== videoId);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVideoList));
  },

  get() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  },
};
