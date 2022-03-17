import SearchMachine from './SearchMachine';
import { getLocalStorage } from './localStorage';
import { LOCALSTORAGE_KEY_SAVE } from '../constant';
import youtubeSearchAPI from '../api/youtubeSearchapi';
import VideoFactory from './VideoFactory';

export class VideoStorage {
  constructor() {
    this.machine = new SearchMachine();
    this.videoList = [];
  }

  async initVideoList() {
    const videoDatas = await Promise.all(
      getLocalStorage(LOCALSTORAGE_KEY_SAVE).map(async (id) => {
        return await youtubeSearchAPI.searchById(id);
      }),
    );
    this.videoList = videoDatas.map((video) =>
      VideoFactory.generateById(video.items[0]),
    );
  }
}
