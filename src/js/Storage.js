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

  updateVideo(newVideo) {
    const index = this.#videos.findIndex((video) => video.id === newVideo.id);
    if (index === -1) {
      throw new Error('저장된 비디오가 아닙니다. 정보를 업데이트 할 수 없습니다.');
    }
    this.#videos.splice(index, 1, newVideo);
    setData('videos', this.#videos);
  }
  
  deleteVideoById(id) {
    const index = this.#videos.findIndex((video) => video.id === id);
    if (index === -1) {
      throw new Error('저장된 비디오가 아닙니다. 삭제할 수 없습니다.');
    }
    this.#videos.splice(index, 1);
    setData('videos', this.#videos);
  }
}
