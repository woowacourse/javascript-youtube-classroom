import { SETTINGS } from '../constants';
import { savedVideoModel } from '../store.js';

const savedVideoService = {
  isSavedVideoCountUnderLimit() {
    return savedVideoModel.getItem().length < SETTINGS.MAX_SAVE_COUNT;
  },
  isSavedVideosEmpty() {
    return savedVideoModel.getItem().length === 0;
  },
  pushNewVideo(video) {
    const videos = [...savedVideoModel.getItem()];
    videos.push(getNewSavedVideo(video));
    savedVideoModel.setItem(videos);
  },
  checkVideo(videoId) {
    const videos = savedVideoModel.getItem();
    const targetVideo = videos.find(video => video.videoId === videoId);
    targetVideo.isChecked = true;
    savedVideoModel.setItem(videos);
  },
  unCheckVideo(videoId) {
    const videos = savedVideoModel.getItem();
    const targetVideo = videos.find(video => video.videoId === videoId);
    targetVideo.isChecked = false;
    savedVideoModel.setItem(videos);
  },
  deleteVideo(videoId) {
    const videos = savedVideoModel.getItem().filter(video => video.videoId !== videoId);
    savedVideoModel.setItem(videos);
  },
  likeVideo(videoId) {
    const videos = savedVideoModel.getItem();
    const targetVideo = videos.find(video => video.videoId === videoId);
    targetVideo.isLiked = true;
    savedVideoModel.setItem(videos);
  },
  cancelVideoLike(videoId) {
    const videos = savedVideoModel.getItem();
    const targetVideo = videos.find(video => video.videoId === videoId);
    targetVideo.isLiked = false;
    savedVideoModel.setItem(videos);
  },
  getIsSavedMarkedVideos(videos) {
    return videos.map(video => ({
      ...video,
      isSaved: isVideoIdExist(savedVideoModel.getItem(), video.videoId),
    }));
  },
};

function getNewSavedVideo(video) {
  return {
    ...video,
    isLiked: false,
    isChecked: false,
  };
}

function isVideoIdExist(videos, videoId) {
  return videos.some(video => video.videoId === videoId);
}

export default savedVideoService;
