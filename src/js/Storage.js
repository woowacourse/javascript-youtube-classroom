import { ERROR_MESSAGE, MAX_VIDEO_SAVE } from './constants';

const Storage = {
  setData(key, data) { localStorage.setItem(key, JSON.stringify(data)) },

  getData(key) { return JSON.parse(localStorage.getItem(key)) },

  getSavedVideos() { return this.getData('videos') || [] },

  saveVideo(video) {
    if (this.videos.length >= MAX_VIDEO_SAVE) {
      throw new Error(ERROR_MESSAGE.MAX_VIDEO_SAVE);
    }
    this.videos.push(video);
    this.setData('videos', this.videos);
  },
  
  findVideoById(id) {
    return this.getSavedVideos().find((video) => video.id === id);
  },

  updateVideo(newVideo) {
    const index = this.videos.findIndex((video) => video.id === newVideo.id);
    if (index === -1) {
      throw new Error(ERROR_MESSAGE.CAN_NOT_UPDATE_ON_NOT_SAVED_VIDEO);
    }
    this.videos.splice(index, 1, newVideo);
    this.setData('videos', this.videos);
  },
  
  deleteVideoById(id) {
    const index = this.videos.findIndex((video) => video.id === id);
    if (index === -1) {
      throw new Error(ERROR_MESSAGE.CAN_NOT_DELETE_ON_NOT_SAVED_VIDEO);
    }
    this.videos.splice(index, 1);
    this.setData('videos', this.videos);
  }
}

export default Storage;
