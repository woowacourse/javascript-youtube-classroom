import { STORAGE_NAME } from "../utils/constants.js";

const videos = {
  fetchedVideos: [],
  recentVideos: [],

  setFetchedVideos(videoItems) {
    const parsedVideoItems = videoItems
      .filter((videoItem) => videoItem.id.videoId)
      .map((videoItem) => this.parseVideoItem(videoItem));
    this.recentVideos = parsedVideoItems;
    this.fetchedVideos = [...this.fetchedVideos, ...parsedVideoItems];
  },

  setSavedVideos(videoId) {
    const selectedVideo = this.selectVideoItemById(videoId);

    localStorage.setItem(
      STORAGE_NAME.SAVED_VIDEOS,
      JSON.stringify([...this.getSavedVideos(), selectedVideo])
    );
  },

  getRecentVideos() {
    return this.recentVideos;
  },

  getSavedVideos() {
    const videos = localStorage.getItem(STORAGE_NAME.SAVED_VIDEOS);

    return videos ? JSON.parse(videos) : [];
  },

  getSavedVideoCount() {
    return this.getSavedVideos().length;
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
    return this.getSavedVideos().some(
      (savedVideo) => savedVideo.videoId === videoId
    );
  },

  removeSavedVideo(videoId) {
    const filteredVideos = this.getSavedVideos().filter(
      (video) => video.videoId !== videoId
    );

    localStorage.setItem(
      STORAGE_NAME.SAVED_VIDEOS,
      JSON.stringify(filteredVideos)
    );
  },
};

export default videos;
