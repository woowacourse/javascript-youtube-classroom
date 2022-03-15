import { YOUTUBE_SEARCH_ACTION } from '@Constants';
import { requestYoutubeSearch } from '@Api';

class YoutubeSearchStore {
  state = {};

  subscribers = [];

  reducer = {};

  middleware = {};

  constructor(initialState) {
    this.state = initialState;
    this.setReducer();
    this.setMiddleWare();
  }

  setReducer() {
    this.reducer = {
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD]: searchKeyword => ({
        ...this.state,
        searchKeyword,
        isLoading: true,
        isLoaded: false,
        items: [],
        nextPageToken: '',
        error: false,
      }),
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_REQUEST]: () => ({
        ...this.state,
        isLoading: true,
        isLoaded: false,
        error: false,
      }),
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_SUCCESS]: ({ items, nextPageToken }) => ({
        ...this.state,
        items: [...this.state.items, ...items],
        nextPageToken,
        isLoading: false,
        isLoaded: true,
        error: false,
      }),
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_FAIL]: () => ({
        ...this.state,
        isLoading: false,
        isLoaded: false,
        error: true,
      }),
    };
  }

  setMiddleWare() {
    this.middleware = {
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT_REQUEST]: async () => {
        await requestYoutubeSearch(this.state.searchKeyword, this.state.nextPageToken);
      },
    };
  }

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }

  dispatch(type, payload) {
    if (!this.reducer[type]) return;
    this.setState(this.reducer[type](payload) ?? this.state);
    this.middleware[type] && this.middleware[type](payload);
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }
}

export default new YoutubeSearchStore({
  searchKeyword: '',
  isLoading: false,
  isLoaded: false,
  items: [],
  nextPageToken: '',
  error: false,
});
