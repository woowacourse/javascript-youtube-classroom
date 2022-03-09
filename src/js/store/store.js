const store = {
  setLocalStorage(video) {
    localStorage.setItem('data', JSON.stringify(video));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('data'));
  },
  updateLocalStorage(data) {
    const savedStore = this.getLocalStorage();
    if (savedStore.length > 100) {
      return;
    }
    if (savedStore.some(video => video.id === data.id)) {
      return;
    }
    this.setLocalStorage([...savedStore, data]);
  },
};

export default store;
