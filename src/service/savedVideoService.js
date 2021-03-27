import { FILTER_TYPE, SETTINGS } from '../constants';
import { savedVideoModel, savedVideoFilter } from '../store.js';

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
    console.log('videos', videos);
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
    console.log(videoId);
    const videos = savedVideoModel.getItem().filter(video => video.videoId !== videoId);
    console.log(videos);
    savedVideoModel.setItem(videos);
  },
  getIsSavedMarkedVideos(videos) {
    return videos.map(video => ({
      ...video,
      isSaved: isVideoIdExist(savedVideoModel.getItem(), video.videoId),
    }));
  },
  getFilteredVideos() {
    const videos = savedVideoModel.getItem();
    const filteredVideos = getLikedFilteredVideo(getCheckedFilteredVideo(videos));
    return filteredVideos;
  },
};

function getCheckedFilteredVideo(videos) {
  if (savedVideoFilter.checked === FILTER_TYPE.ALL) {
    return videos;
  }
  if (savedVideoFilter.checked === FILTER_TYPE.FULFILLED_ONLY) {
    return videos.filter(video => video.isChecked === true);
  }
  if (savedVideoFilter.checked === FILTER_TYPE.NOT_FULFILLED_ONLY) {
    return videos.filter(video => video.isChecked === false);
  }
}

function getLikedFilteredVideo(videos) {
  if (savedVideoFilter.liked === FILTER_TYPE.ALL) {
    return videos;
  }
  if (savedVideoFilter.liked === FILTER_TYPE.FULFILLED_ONLY) {
    return videos.filter(video => video.Liked === true);
  }
  if (savedVideoFilter.liked === FILTER_TYPE.NOT_FULFILLED_ONLY) {
    return videos.filter(video => video.Liked === false);
  }
}

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
