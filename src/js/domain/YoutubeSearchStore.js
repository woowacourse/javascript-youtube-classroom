import { YOUTUBE_SEARCH_ACTION } from '@Constants';
import { requestYoutubeSearch } from '@Api';

class YoutubeSearchStore {
  state = {};

  subscribers = [];

  reducer = {};

  constructor(initialState) {
    this.state = initialState;
    this.setReducer();
  }

  setReducer() {
    this.reducer = {
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD]: this.updateSearchKeyword,
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_LOADING_STATUS]: this.updateSearchLoadingStatus,
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT]: this.updateSearchResult,
    };
  }

  updateSearchKeyword = searchKeyword => {
    this.setState({
      ...this.state,
      searchKeyword,
      isLoading: true,
      isLoaded: false,
      items: [],
      nextPageToken: '',
      error: false,
    });
  };

  updateSearchLoadingStatus = isLoading => {
    this.setState({ ...this.state, isLoading });
  };

  updateSearchResult = async () => {
    if (this.state.nextPageToken === undefined) return;
    const {
      items = [],
      nextPageToken = '',
      error = false,
    } = await requestYoutubeSearch(this.state.searchKeyword, this.state.nextPageToken);

    this.setState({
      ...this.state,
      isLoading: false,
      isLoaded: true,
      items: [...this.state.items, ...items],
      error,
      nextPageToken,
    });
  };

  getState() {
    return this.state;
  }

  setState(newState) {
    this.state = newState;
    this.subscribers.forEach(subscriber => subscriber(this.state));
  }

  dispatch(type, data) {
    this.reducer[type] && this.reducer[type](data);
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
