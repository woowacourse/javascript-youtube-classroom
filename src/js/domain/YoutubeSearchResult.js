import Store from '@Core/Store';
import { requestYoutubeSearch } from '../api';

class SearchStore extends Store {
  state = {
    searchKeyword: '',
    isLoading: false,
    items: [],
    nextPageToken: '',
    error: '',
  };

  reducer(type, data) {
    const stateByType = {
      UPDATE_SEARCH_KEYWORD: () => {
        this.setState({ ...this.state, searchKeyword: data, isLoading: true });
      },
      UPDATE_SEARCH_RESULT: async () => {
        const { items, nextPageToken } = await requestYoutubeSearch(this.state.searchKeyword);
        this.setState({
          ...this.state,
          isLoading: false,
          items,
          nextPageToken,
        });
      },
    };
    stateByType[type] && stateByType[type]();
  }
}

export default new SearchStore();
