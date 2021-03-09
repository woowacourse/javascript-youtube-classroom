import { LOCAL_STORAGE_KEY } from '../constants.js';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from './localStorageUtil.js';

// TODO : Mixin 을 활용해서 리팩토링
const watchedVideo = {
  getVideos() {
    return getLocalStorageItem(LOCAL_STORAGE_KEY.WATCHED_VIDEOS) || [];
  },
  setVideos(videos) {
    if (!Array.isArray(videos)) {
      return;
    }
    setLocalStorageItem(LOCAL_STORAGE_KEY.WATCHED_VIDEOS, videos);
  },
  pushVideo(newVideo) {
    const videosToWatch = watchedVideo.getVideos();
    videosToWatch.push(newVideo);
    watchedVideo.setVideos(videosToWatch);
  },
  popVideoByVideoId(videoId) {
    const videos = watchedVideo.getVideos();
    const poppedVideo = videos.find(video => video.videoId === videoId);
    if (!poppedVideo) {
      return;
    }
    watchedVideo.setVideos(videos.filter(video => video.videoId !== videoId));

    return poppedVideo;
  },
};

export default watchedVideo;
