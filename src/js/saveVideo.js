import { VIDEO_ID_LIST_KEY } from './constants/contants.js';

class SaveVideo {
  constructor() {
    this.saveVideoList = this.#getStorageVideoList();
  }

  saveVideoInformationToStorage(videoInformation) {
    this.saveVideoList = [{ ...videoInformation, isChecked: false }, ...this.saveVideoList];
    localStorage.setItem(VIDEO_ID_LIST_KEY, JSON.stringify(this.saveVideoList));
  }

  #getStorageVideoList() {
    return JSON.parse(localStorage.getItem(VIDEO_ID_LIST_KEY)) || [];
  }

  removeVideoFromStorage({ videoId }) {
    this.saveVideoList = this.saveVideoList.filter((video) => video.videoId !== videoId);
    localStorage.setItem(VIDEO_ID_LIST_KEY, JSON.stringify(this.saveVideoList));
  }

  toggleVideoIsCheckedFromStorage({ videoId }) {
    this.saveVideoList.some((video) => {
      if (video.videoId === videoId) {
        video.isChecked = !video.isChecked;
        return true;
      }
    });
    localStorage.setItem(VIDEO_ID_LIST_KEY, JSON.stringify(this.saveVideoList));
  }
}

export default SaveVideo;
