import { LOCAL_DB } from "../utils/contants.js";
import { getLocalStorage, saveLocalStorage } from "../utils/localStorage.js";
import Observer from "./Observer.js";

export default class VideoManager extends Observer {
  constructor() {
    super();
    this.state = {
      videos: getLocalStorage(LOCAL_DB.VIDEOS),
    };
  }

  getSavedVideos() {
    return this.state.videos;
  }

  getSavedIds() {
    return this.state.videos.map((video) => video.id);
  }

  saveVideos(videoInfo) {
    this.#setState({ videos: [...this.state.videos, { ...videoInfo, watched: false }] });
  }

  toggleWatchVideo(id) {
    const videos = [...this.state.videos];
    const index = videos.findIndex((video) => video.id === id);
    videos[index].watched = !videos[index].watched;
    this.#setState({ videos });
  }

  removeVideo(id) {
    const videos = this.state.videos.filter((video) => video.id !== id);
    this.#setState({ videos });
  }

  #setState(newState) {
    this.state = { ...this.state, ...newState };
    saveLocalStorage(LOCAL_DB.VIDEOS, this.state.videos);
    this.notify();
  }
}
