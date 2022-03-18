import {
  removeLocalStorage,
  toggleWatchedToStorage,
} from '../domain/localStorage';
import SearchMachine from '../domain/SearchMachine';
import { VideoStorage } from '../domain/VideoStorage';

class VideoStore {
  constructor() {
    this.videoMachine = new SearchMachine();
    this.videoStorage = new VideoStorage();
  }
  set keyword(value) {
    this.videoMachine.keyword = value;
  }

  async search() {
    return await this.videoMachine.search();
  }

  initPageToken() {
    this.videoMachine.initPageToken();
  }

  saveVideoToLocalStorage(id) {
    this.videoMachine.saveVideoToLocalStorage(id);
  }

  appendVideo(data) {
    this.videoStorage.appendVideo(data);
  }

  async initVideoList() {
    return await this.videoStorage.initVideoList();
  }

  get notWachedVideoList() {
    return this.videoStorage.notWachedVideoList;
  }

  toggleState(id) {
    this.videoStorage.toggleState(id);
  }

  toggleWatchedToStarge(id) {
    toggleWatchedToStorage(id);
  }

  removeLocalStorageVideo(id) {
    removeLocalStorage('save', id);
    removeLocalStorage('watched', id);
  }

  removeVideo(id) {
    this.videoStorage.removeVideo(id);
  }
}

export const globalStore = new VideoStore();
