import { YOUTUBE_SEARCH_ACTION } from '@Constants';
import { getParsedVideoItems } from '@Utils/dataManager';
import { requestYoutubeSearch } from '@Api';

const initialState = {
  searchKeyword: '',
  isLoading: false,
  isLoaded: false,
  items: [],
  nextPageToken: '',
  error: false,
  isEnded: false,
};

const reducer = {
  [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD]: (state, searchKeyword) => ({
    ...state,
    searchKeyword,
    isLoading: true,
    isLoaded: false,
    items: [],
    nextPageToken: '',
    error: false,
  }),
  [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_REQUEST]: state => ({
    ...state,
    isLoading: true,
    isLoaded: false,
    error: false,
  }),
  [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_SUCCESS]: (
    state,
    { items, nextPageToken, pageInfo },
  ) => ({
    ...state,
    items: [...state.items, ...getParsedVideoItems(items)],
    nextPageToken,
    isEnded: pageInfo.totalResults <= items.length || !nextPageToken,
    isLoading: false,
    isLoaded: true,
    error: false,
  }),
  [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_FAIL]: state => ({
    ...state,
    isLoading: false,
    isLoaded: true,
    error: true,
  }),
};

const middleware = {
  [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_REQUEST]: async state => {
    await requestYoutubeSearch(state.searchKeyword, state.nextPageToken);
  },
};
class YoutubeSearchStore {
  state = {};

  subscribers = [];

  constructor({ initialState, reducer, middleware }) {
    this.state = initialState;
    this.reducer = reducer;
    this.middleware = middleware;
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.subscribers.forEach(subscriber => subscriber());
  }

  dispatch(type, payload) {
    if (!this.reducer[type]) return;
    this.setState(this.reducer[type](this.state, payload) ?? this.state);
    this.middleware[type] && this.middleware[type](this.state, payload);
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }
}

export default new YoutubeSearchStore({ initialState, reducer, middleware });
