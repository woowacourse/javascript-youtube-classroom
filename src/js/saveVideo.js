import { VIDEO_ID_LIST_KEY } from './constants/contants.js';

class SaveVideo {
  constructor() {
    this.saveVideoList = this.#getStorageVideoList();
  }

  saveVideoInformationToStorage(videoInformation) {
    this.saveVideoList = [videoInformation, ...this.saveVideoList];
    localStorage.setItem(VIDEO_ID_LIST_KEY, JSON.stringify(this.saveVideoList));
  }

  #getStorageVideoList() {
    return JSON.parse(localStorage.getItem(VIDEO_ID_LIST_KEY)) || [];
  }
}

export default SaveVideo;
