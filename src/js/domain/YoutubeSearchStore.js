import Store from '@Core/Store';
import { ACTION_TYPE } from '@Constants/String';
import { requestYoutubeSearch } from '../api';

class YoutubeSearchStore extends Store {
  state = {
    searchKeyword: '',
    isLoading: false,
    isLoaded: false,
    items: [],
    totalResults: Number.MAX_SAFE_INTEGER,
    nextPageToken: '',
    error: false,
  };

  dispatch(type, data) {
    const stateByType = {
      [ACTION_TYPE.UPDATE_SEARCH_KEYWORD]: this.setUpdateKeyword.bind(this),
      [ACTION_TYPE.UPDATE_SEARCH_LOADING_STATUS]: this.setLoadingStatus.bind(this),
      [ACTION_TYPE.UPDATE_SEARCH_RESULT]: this.setUpdateResult.bind(this),
    };

    stateByType[type](data);
  }

  #isLastItem() {
    return this.state.items.length >= this.state.totalResults;
  }

  setUpdateKeyword(keyword) {
    this.setState({
      ...this.state,
      searchKeyword: keyword,
      isLoading: true,
      isLoaded: false,
      items: [],
      totalResults: Number.MAX_SAFE_INTEGER,
      nextPageToken: '',
      error: false,
    });
  }

  setLoadingStatus() {
    this.setState({ ...this.state, isLoading: true });
  }

  async setUpdateResult() {
    if (this.#isLastItem() === true) {
      this.setState({
        ...this.state,
        isLoading: false,
        isLoaded: true,
      });
      return;
    }

    const {
      items = [],
      pageInfo = { totalResults: 0 },
      nextPageToken = '',
      error = false,
    } = await requestYoutubeSearch(this.state.searchKeyword, this.state.nextPageToken);

    this.setState({
      ...this.state,
      isLoading: false,
      isLoaded: true,
      items: [...this.state.items, ...items],
      totalResults: pageInfo.totalResults,
      error,
      nextPageToken,
    });
  }
}

export default new YoutubeSearchStore();
