export const store = {
  setLocalStorage(videoId) {
    localStorage.setItem('videoId', JSON.stringify(videoId));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem('videoId'));
  },
};
