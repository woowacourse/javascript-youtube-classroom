import { STORAGE_NAME } from "../utils/constants.js";

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
    const parsedVideoItems = videoItems
      .filter((videoItem) => videoItem.id.videoId)
      .map((videoItem) => this.parseVideoItem(videoItem));
    this.recentVideos = parsedVideoItems;
    this.fetchedVideos = [...this.fetchedVideos, ...parsedVideoItems];
  },

  setSavedVideos(videoId) {
    const selectedVideo = this.selectVideoItemById(videoId);
    this.savedVideos = [...this.savedVideos, selectedVideo];

    this.storeSavedVideos();
  },

  setVideoWatched(videoId) {
    const watchedVideo = this.savedVideos.find(
      (video) => video.videoId === videoId
    );
    const watchedVideoIndex = this.savedVideos.indexOf(watchedVideo);

    this.savedVideos = [
      ...this.savedVideos.slice(0, watchedVideoIndex),
      { ...watchedVideo, watched: true },
      ...this.savedVideos.slice(watchedVideoIndex + 1),
    ];

    this.storeSavedVideos();
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

  selectVideoItemById(videoId) {
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
    this.savedVideos = this.savedVideos.filter(
      (video) => video.videoId !== videoId
    );

    this.storeSavedVideos();
  },
};

export default videos;
