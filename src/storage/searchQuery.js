import { LOCAL_STORAGE_KEY } from '../constants.js';
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from './localStorageUtil.js';

const searchQuery = {
  getQueries() {
    return getLocalStorageItem(LOCAL_STORAGE_KEY.SEARCH_QUERIES) || [];
  },

  setQueries(queries) {
    if (!Array.isArray(queries)) {
      return;
    }
    setLocalStorageItem(LOCAL_STORAGE_KEY.SEARCH_QUERIES, queries);
  },

  pushQuery(query) {
    if (typeof query !== 'string') {
      return;
    }
    const queries = searchQuery.getQueries();
    queries.push(query);
    searchQuery.setQueries(queries);
  },
};

export default searchQuery;
