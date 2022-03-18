import { ERROR_MESSAGE, MAX_VIDEO_SAVE } from './constants';

const Storage = {
  setData(key, data) { localStorage.setItem(key, JSON.stringify(data)) },

  getData(key) { return JSON.parse(localStorage.getItem(key)) },

  getSavedVideos() { return this.getData('videos') || [] },

  saveVideo(video) {
    const videos = this.getSavedVideos();
    if (videos.length >= MAX_VIDEO_SAVE) {
      throw new Error(ERROR_MESSAGE.MAX_VIDEO_SAVE);
    }
    videos.push(video);
    this.setData('videos', videos);
  },
  
  findVideoById(id) {
    const videos = this.getSavedVideos();
    return videos.find((video) => video.id === id);
  },

  updateVideo(newVideo) {
    const videos = this.getSavedVideos();
    const index = videos.findIndex((video) => video.id === newVideo.id);
    if (index === -1) {
      throw new Error(ERROR_MESSAGE.CAN_NOT_UPDATE_ON_NOT_SAVED_VIDEO);
    }
    videos.splice(index, 1, newVideo);
    this.setData('videos', videos);
  },
  
  deleteVideoById(id) {
    const videos = this.getSavedVideos();
    const index = videos.findIndex((video) => video.id === id);
    if (index === -1) {
      throw new Error(ERROR_MESSAGE.CAN_NOT_DELETE_ON_NOT_SAVED_VIDEO);
    }
    videos.splice(index, 1);
    this.setData('videos', videos);
  }
}

export default Storage;
