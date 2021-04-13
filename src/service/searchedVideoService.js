import { searchedVideoModel } from '../store.js';

const searchedVideoService = {
  isSearchedVideosEmpty() {
    return searchedVideoModel.getVideos().length === 0;
  },
  addSearchedVideos(videos) {
    searchedVideoModel.setVideos([...searchedVideoModel.getVideos(), ...videos]);
  },
  setSearchedVideos(videos) {
    searchedVideoModel.setVideos(videos);
  },
};

export default searchedVideoService;
