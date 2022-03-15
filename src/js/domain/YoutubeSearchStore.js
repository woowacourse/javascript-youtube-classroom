import Store from '@Core/Store';
import { ACTION_TYPE } from '@Constants/String';
import { requestYoutubeSearch } from '../api';

const isLastItem = (itemCount, total) => itemCount >= total;

const reducer = {
  [ACTION_TYPE.UPDATE_SEARCH_KEYWORD]: (state, keyword) => ({
    ...state,
    searchKeyword: keyword,
    isLoading: true,
    isLoaded: false,
    items: [],
    totalResults: Number.MAX_SAFE_INTEGER,
    nextPageToken: '',
    error: false,
  }),
  [ACTION_TYPE.UPDATE_SEARCH_LOADING_STATUS]: state => ({ ...state, isLoading: true }),
  [ACTION_TYPE.UPDATE_SEARCH_RESULT]: async state => {
    if (isLastItem() === true) {
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };
    }

    const {
      items = [],
      pageInfo = { totalResults: 0 },
      nextPageToken = '',
      error = false,
    } = await requestYoutubeSearch(state.searchKeyword, state.nextPageToken);

    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: [...state.items, ...items],
      totalResults: pageInfo.totalResults,
      error,
      nextPageToken,
    };
  },
};

const YoutubeSearchStore = new Store(
  {
    searchKeyword: '',
    isLoading: false,
    isLoaded: false,
    items: [],
    totalResults: Number.MAX_SAFE_INTEGER,
    nextPageToken: '',
    error: false,
  },
  reducer,
);

export default YoutubeSearchStore;
