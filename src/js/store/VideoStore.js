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
    console.log(this.videoMachine);
    return await this.videoMachine.search();
  }

  initPageToken() {
    this.videoMachine.initPageToken();
  }
}

export const globalStore = new VideoStore();
