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
}

export const globalStore = new VideoStore();
