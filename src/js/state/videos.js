import {
  ERROR_MESSAGE,
  STORAGE_NAME,
  SUCCESS_MESSAGE,
} from "../utils/constants.js";
import { showSnackbar } from "../utils/snackbar.js";

const videos = {
  fetchedVideos: [],
  recentVideos: [],
  savedVideos: [],

  initSavedVideos() {
    const videos = localStorage.getItem(STORAGE_NAME.SAVED_VIDEOS);

    this.savedVideos = videos ? JSON.parse(videos) : [];
  },

  storeSavedVideos() {
    localStorage.setItem(
      STORAGE_NAME.SAVED_VIDEOS,
      JSON.stringify(this.savedVideos)
    );
  },

  setFetchedVideos(videoItems) {
    this.recentVideos = videoItems
      .filter((videoItem) => videoItem.id.videoId)
      .map((videoItem) => this.parseVideoItem(videoItem));

    this.fetchedVideos = [...this.fetchedVideos, ...this.recentVideos];
  },

  setSavedVideos(videoId) {
    try {
      const selectedVideo = this.selectFetchedVideoById(videoId);

      if (!selectedVideo) {
        throw new Error(ERROR_MESSAGE.SAVE_ERROR);
      }

      this.savedVideos = [
        ...this.savedVideos,
        { ...selectedVideo, saved: true },
      ];

      this.storeSavedVideos();
      showSnackbar(SUCCESS_MESSAGE.SAVE_VIDEO);
    } catch (e) {
      console.error(e);
      showSnackbar(e.message);
    }
  },

  setVideoWatched(videoId, watched) {
    try {
      const watchedVideoIndex = this.savedVideos.findIndex(
        (video) => video.videoId === videoId
      );

      if (watchedVideoIndex === -1) {
        throw new Error(ERROR_MESSAGE.CONNOT_FIND_INDEX_OF_VIDEO);
      }

      const watchedVideo = this.savedVideos[watchedVideoIndex];

      this.savedVideos = [
        ...this.savedVideos.slice(0, watchedVideoIndex),
        { ...watchedVideo, watched },
        ...this.savedVideos.slice(watchedVideoIndex + 1),
      ];

      this.storeSavedVideos();
      showSnackbar(
        watched
          ? SUCCESS_MESSAGE.WATCH_VIDEO
          : SUCCESS_MESSAGE.CLEAR_WATCH_VIDEO_LOG
      );
    } catch (e) {
      console.error(e);
      showSnackbar(ERROR_MESSAGE.INVALID_ACTION_ERROR);
    }
  },

  getRecentVideos() {
    return this.recentVideos;
  },

  getSavedVideos() {
    return this.savedVideos;
  },

  getSavedVideoCount() {
    return this.savedVideos.length;
  },

  selectFetchedVideoById(videoId) {
    return this.fetchedVideos.find(
      (fetchedVideo) => fetchedVideo.videoId === videoId
    );
  },

  parseVideoItem(videoItem) {
    return {
      videoId: videoItem.id.videoId,
      title: videoItem.snippet.title,
      channelId: videoItem.snippet.channelId,
      channelTitle: videoItem.snippet.channelTitle,
      publishedAt: videoItem.snippet.publishedAt,
      thumbnail: videoItem.snippet.thumbnails.medium.url,
      saved: this.isSavedVideo(videoItem.id.videoId),
      watched: false,
      liked: false,
    };
  },

  isSavedVideo(videoId) {
    return this.savedVideos.some(
      (savedVideo) => savedVideo.videoId === videoId
    );
  },

  removeSavedVideo(videoId) {
    const prevLength = this.savedVideos.length;
    this.savedVideos = this.savedVideos.filter(
      (video) => video.videoId !== videoId
    );

    const isChanged = prevLength !== this.savedVideos.length;
    if (isChanged) {
      showSnackbar(SUCCESS_MESSAGE.DELETE_VIDEO);
      this.storeSavedVideos();
    } else {
      showSnackbar(ERROR_MESSAGE.DELETE_ERROR);
    }
  },
};

export default videos;
