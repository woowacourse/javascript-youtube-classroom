export default class StorageEngine {
  getSavedVideos() {
    return JSON.parse(localStorage.getItem('savedVideos'));
  }

  saveVideo(videoId) {
    const savedVidoes = this.getSavedVideos() ?? [];
    const newVideo = { videoId };

    if (savedVidoes.length >= 100) return;

    savedVidoes.push(newVideo);
    localStorage.setItem('savedVideos', JSON.stringify(savedVidoes));
  }
}
