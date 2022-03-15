import Store from '@Core/Store';
import { YOUTUBE_SEARCH_ACTION } from '@Constants';
import { requestYoutubeSearch } from '../api';

class YoutubeSearchStore extends Store {
  state = {
    searchKeyword: '',
    isLoading: false,
    isLoaded: false,
    items: [],
    nextPageToken: '',
    error: false,
  };

  setReducer() {
    this.reducer = {
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD]: this.updateSearchKeyword.bind(this),
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_LOADING_STATUS]:
        this.updateSearchLoadingStatus.bind(this),
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT]: this.updateSearchResult.bind(this),
    };
  }

  updateSearchKeyword(searchKeyword) {
    this.setState({
      ...this.state,
      searchKeyword,
      isLoading: true,
      isLoaded: false,
      items: [],
      nextPageToken: '',
      error: false,
    });
  }

  updateSearchLoadingStatus(isLoading) {
    this.setState({ ...this.state, isLoading });
  }

  async updateSearchResult() {
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
  }
}

export default new YoutubeSearchStore();
