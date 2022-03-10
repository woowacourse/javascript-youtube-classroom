class SaveVideo {
  constructor() {
    this.saveVideoList = this.getStorageVideoList();
  }

  setStorageVideoList(videoId) {
    this.saveVideoList = [videoId, ...this.saveVideoList];
    localStorage.setItem('VIDEO_ID_LIST', JSON.stringify(this.saveVideoList));
  }

  getStorageVideoList() {
    return JSON.parse(localStorage.getItem('VIDEO_ID_LIST')) || [];
  }
}

export default SaveVideo;
