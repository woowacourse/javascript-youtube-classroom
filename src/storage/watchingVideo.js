import { LOCAL_STORAGE_KEY } from '../constants.js';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from './localStorageUtil.js';

const watchingVideo = {
  getVideos() {
    return getLocalStorageItem(LOCAL_STORAGE_KEY.VIDEOS_TO_WATCH) || [];
  },
  setVideos(videos) {
    if (!Array.isArray(videos)) {
      return;
    }
    setLocalStorageItem(LOCAL_STORAGE_KEY.VIDEOS_TO_WATCH, videos);
  },
  pushVideo(newVideo) {
    const watchingVideos = watchingVideo.getVideos();
    watchingVideos.push(newVideo);
    watchingVideo.setVideos(watchingVideos);
  },
  popVideoByVideoId(videoId) {
    const videos = watchingVideo.getVideos();
    const poppedVideo = videos.find(video => video.videoId === videoId);
    if (!poppedVideo) {
      return;
    }
    watchingVideo.setVideos(videos.filter(video => video.videoId !== videoId));

    return poppedVideo;
  },
};

export default watchingVideo;
