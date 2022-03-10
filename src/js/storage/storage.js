const storage = {
  setLocalStorage(video) {
    localStorage.setItem('data', JSON.stringify(video));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('data'));
  },
  updateLocalStorage(data) {
    const savedStorage = this.getLocalStorage();
    if (savedStorage.length > 100) {
      return;
    }
    if (savedStorage.some(video => video.id === data.id)) {
      return;
    }
    this.setLocalStorage([...savedStorage, data]);
  },
  saveVideo(videoId) {
    const video = {
      id: videoId,
    };
    const savedStorage = this.getLocalStorage();

    if (savedStorage) {
      this.updateLocalStorage(video);
      return;
    }
    this.setLocalStorage([video]);
  },
};

export default storage;
