import { LOCAL_STORAGE_KEY } from '../constants.js';
import { getLocalStorageItem, setLocalStorageItem } from './localStorage.js';

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
    const quries = searchQuery.getQueries();
    quries.push(query);
    searchQuery.setQueries(quries);
  },
};

export default searchQuery;
