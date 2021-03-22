import { getListFromDB, setListToDB, deleteTargetItemByKey } from '../utils/localStorage.js';
import { DB_KEY } from '../constants.js';

export default class StorageModel {
  constructor() {
    this.setVideos();
  }

  setVideos() {
    this.videos = getListFromDB(DB_KEY.VIDEOS);
  }

  get videosCount() {
    return this.videos.length;
  }

  get watchingVideoCount() {
    return this.videos.filter((video) => video.isWatching).length;
  }

  get watchedVideoCount() {
    return this.videos.filter((video) => !video.isWatching).length;
  }

  isOnlyWatchingVideoSaved() {
    return this.watchingVideoCount > 0 && this.watchedVideoCount === 0;
  }

  hasNoWatchingVideoSaved() {
    return this.watchingVideoCount === 0;
  }

  hasNoWatchedVideoSaved() {
    return this.watchedVideoCount === 0;
  }

  moveVideo() {
    const targetId = this.targetVideo.id;
    const videos = getListFromDB(DB_KEY.VIDEOS);
    const target = videos.find((video) => video.videoId === targetId);

    target.isWatching = !target.isWatching;
    setListToDB(DB_KEY.VIDEOS, videos);
    this.setVideos();
  }

  removeVideo() {
    deleteTargetItemByKey(
      {
        key: DB_KEY.VIDEOS,
        secondKey: 'videoId',
      },
      this.targetVideo.id,
    );
    this.setVideos();
  }
}
