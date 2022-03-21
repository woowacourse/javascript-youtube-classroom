import { getLocalStorage } from './localStorage';
import { LOCALSTORAGE_KEY_SAVE } from '../constant';
import youtubeSearchAPI from '../api/youtubeSearchapi';
import VideoFactory from './VideoFactory';
import Video from './Video';

export class VideoStorage {
  constructor() {
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

  appendVideo({ id, thumbnails, title, channelTitle, publishTime }) {
    if (this.videoList.some(({ id }) => id === id))
      throw new Error('동일 ID는 존재할 수 없습니다.');
    this.videoList.push(
      Video.Builder()
        .setId(id)
        .setThumbnails(thumbnails)
        .setTitle(title)
        .setChannelTitle(channelTitle)
        .setPublishTime(publishTime)
        .build(),
    );
  }

  toggleState(targetId) {
    this.videoList.find(({ id }) => id === targetId).toggleIsWatched();
  }

  removeVideo(targetId) {
    this.videoList = this.videoList.filter(({ id }) => id !== targetId);
  }

  get notWachedVideoList() {
    return this.videoList.filter((video) => !video.isWatched);
  }

  get wachedVideoList() {
    return this.videoList.filter((video) => video.isWatched);
  }
}
