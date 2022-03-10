class SaveVideo {
  constructor() {
    this.saveVideoList = [];
  }

  setStorageVideoList(videoId) {
    this.saveVideoList = [videoId, ...this.saveVideoList];
    localStorage.setItem('VIDEO_ID_LIST', JSON.stringify(this.saveVideoList));
  }
}

export default SaveVideo;
