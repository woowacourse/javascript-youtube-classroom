import Store from '@Core/Store';
import { ACTION_TYPE } from '@Constants/String';
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

  dispatch(type, data) {
    const stateByType = {
      [ACTION_TYPE.UPDATE_SEARCH_KEYWORD]: () => {
        this.setState({
          ...this.state,
          searchKeyword: data,
          isLoading: true,
          isLoaded: false,
          items: [],
          nextPageToken: '',
          error: false,
        });
      },
      [ACTION_TYPE.UPDATE_SEARCH_LOADING_STATUS]: () => {
        this.setState({ ...this.state, isLoading: true });
      },
      [ACTION_TYPE.UPDATE_SEARCH_RESULT]: async () => {
        if (this.state.nextPageToken === undefined) return; // 분리하기

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
      },
    };
    stateByType[type] && stateByType[type]();
  }
}

export default new YoutubeSearchStore();
