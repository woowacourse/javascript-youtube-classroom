import Store from '@Core/Store';
import { YOUTUBE_SEARCH_ACTION } from '@Constants/action';
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
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_KEYWORD]: () => {
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
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_LOADING_STATUS]: isLoading => {
        this.setState({ ...this.state, isLoading });
      },
      [YOUTUBE_SEARCH_ACTION.UPDATE_SEARCH_RESULT]: async () => {
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
      },
    };
    stateByType[type] && stateByType[type](data);
  }
}

export default new YoutubeSearchStore();
