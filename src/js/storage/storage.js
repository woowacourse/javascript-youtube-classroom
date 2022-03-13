const storage = {
  setLocalStorage(video) {
    localStorage.setItem('searchResults', JSON.stringify(video));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('searchResults'));
  },
  updateLocalStorage(searchResults) {
    console.log(searchResults);
    const savedStorage = this.getLocalStorage();
    console.log(savedStorage);
    if (!savedStorage) {
      this.setLocalStorage(searchResults);
    }
    if (savedStorage.length > 100) {
      return;
    }
    if (savedStorage.some(video => video.id === searchResults.id)) {
      return;
    }
    this.setLocalStorage([...savedStorage, searchResults]);
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
