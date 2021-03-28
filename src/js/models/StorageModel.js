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
    return this.videos.filter((video) => !video.isWatched).length;
  }

  get watchedVideoCount() {
    return this.videos.filter((video) => video.isWatched).length;
  }

  get likedVideoCount() {
    return this.videos.filter((video) => video.isLiked).length;
  }

  isOnlyWatchingVideoSaved() {
    return this.watchingVideoCount > 0 && this.watchedVideoCount === 0;
  }

  switchWatchFlag() {
    const targetId = this.targetVideo.id;
    const videos = getListFromDB(DB_KEY.VIDEOS);
    const target = videos.find((video) => video.videoId === targetId);

    target.isWatched = !target.isWatched;

    setListToDB(DB_KEY.VIDEOS, videos);
    this.setVideos();
  }

  switchLikeFlag() {
    const targetId = this.targetVideo.id;
    const videos = getListFromDB(DB_KEY.VIDEOS);
    const target = videos.find((video) => video.videoId === targetId);

    target.isLiked = !target.isLiked;

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
