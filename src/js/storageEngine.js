export default class StorageEngine {
  getData() {
    return JSON.parse(localStorage.getItem('myVideos'));
  }

  saveData(videoId) {
    const myVideosData = this.getData() ?? [];
    const newVideoData = { id: videoId, isSaved: false };

    if (myVideosData.length >= 100) return;

    myVideosData.push(newVideoData);
    localStorage.setItem('myVideos', JSON.stringify(myVideosData));
  }

  clearData() {
    localStorage.removeItem('myVideos');
  }
}
