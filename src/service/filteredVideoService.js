import { FILTER_TYPE } from '../constants.js';
import { savedVideoModel, savedVideoFilter, videoSlicer } from '../store.js';

const filteredVideoService = {
  getFilteredVideos() {
    const videos = savedVideoModel.getItem();
    const filteredVideos = getLikedFilteredVideo(getCheckedFilteredVideo(videos));
    return videoSlicer.getSlicedVideos(filteredVideos);
  },
  getUpSlicedVideos() {
    videoSlicer.increaseSlicerIndex();
    return filteredVideoService.getFilteredVideos();
  },
  getDownSlicedVideos() {
    videoSlicer.decreaseSlicerIndex();
    return filteredVideoService.getFilteredVideos();
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
    return videos.filter(video => video.isLiked === true);
  }
  if (savedVideoFilter.liked === FILTER_TYPE.NOT_FULFILLED_ONLY) {
    return videos.filter(video => video.isLiked === false);
  }
}

export default filteredVideoService;
