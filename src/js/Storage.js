const setData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const getData = (key) => JSON.parse(localStorage.getItem(key));

export default class Storage {
  #videos;

  constructor() {
    this.#videos = getData('videos') || [];
  }

  get videos() { return this.#videos; }

  saveVideo(video) {
    this.#videos.push(video);
    setData('videos', this.#videos);
  }
  
  findVideoById(id) {
    return this.#videos.find((video) => video.id === id);
  }
}
