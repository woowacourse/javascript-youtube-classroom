import { validateAddData, changeVideoChecked, removeVideoItem } from "./utils";

export default class VideoStorage {
  #videos = JSON.parse(localStorage.getItem("saveVideoData")) || [];

  getVideo() {
    return this.#videos;
  }

  setVideo() {
    localStorage.setItem("saveVideoData", JSON.stringify(this.#videos));
  }

  addVideo(data) {
    validateAddData(data, this.#videos);

    this.#videos = [...this.#videos, data];
    this.setVideo();
  }

  removeVideo(removeData) {
    this.#videos = removeVideoItem(this.#videos, removeData);
    this.setVideo();
  }

  addChecked(addData) {
    this.#videos = changeVideoChecked(this.#videos, addData, true);
    this.setVideo();
  }

  removeChecked(removeData) {
    this.#videos = changeVideoChecked(this.#videos, removeData, false);
    this.setVideo();
  }
}
