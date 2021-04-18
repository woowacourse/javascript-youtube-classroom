import { prevSearchResultStorage } from "../storage/";

const prevSearchResultService = {
  getVideos() {
    return prevSearchResultStorage.getItem().prevSearchedVideos;
  },

  getLastQuery() {
    return prevSearchResultStorage.getItem().lastQuery;
  },
};

export default prevSearchResultService;
