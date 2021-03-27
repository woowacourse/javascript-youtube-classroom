import { SETTINGS } from '../constants';
import { prevSearchResultModel, searchQueryModel } from '../store.js';

const prevSearchInfoService = {
  saveSearchQuery(searchQuery) {
    const filteredQueries = searchQueryModel.getItem().filter(query => searchQuery !== query);
    filteredQueries.push(searchQuery);
    if (filteredQueries.length > SETTINGS.MAX_SAVED_SEARCH_QUERY_COUNT) {
      filteredQueries.shift();
    }
    searchQueryModel.setItem(filteredQueries);
  },
  savePrevSearchInfo({ lastQuery, nextPageToken }) {
    if (lastQuery) {
      prevSearchResultModel.setItem({ lastQuery });
    }
    if (nextPageToken) {
      prevSearchResultModel.setItem({ nextPageToken });
    }
  },
  savePrevSearchedVideos(videos) {
    prevSearchResultModel.setItem({ prevSearchedVideos: videos });
  }
};


export default prevSearchInfoService;
