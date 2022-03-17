import { getSearchAPI } from '../../../api/api.js';
import Component from '../../../core/Component.js';
import { rootStore } from '../../../store/rootStore.js';
import { makeCardData } from '../SearchBar.js';
import VideoCardList from './VideoCardList.js';

export default class SearchResult extends Component {
  template() {
    return `
      <ul id="video-list" class="video-list"></ul>
    `;
  }

  afterMounted() {
    const { videos, isLoading } = rootStore.state;

    new VideoCardList(this.$('#video-list'), {
      videos,
      isLoading,
      handleLastVideoVisible: this.handleLastVideoVisible.bind(this),
    });
  }

  handleLastVideoVisible(entries, observer) {
    entries.forEach(async entry => {
      if (!entry.isIntersecting || rootStore.state.isLoading) return;

      observer.disconnect();

      rootStore.setState({ isLoading: true });

      const newVideos = await this.loadNextVideos();

      rootStore.setState({
        videos: [...rootStore.state.videos, ...newVideos],
        isLoading: false,
      });
    });
  }

  async loadNextVideos() {
    const { query, pageToken: prevPageToken } = rootStore.state.searchOption;

    const [error, data] = await getSearchAPI(query, prevPageToken);
    if (error) {
      alert(`${error.message}, status: ${error.statusCode}`);

      return;
    }

    const { items, nextPageToken } = data;

    rootStore.setState({
      searchOption: {
        query,
        pageToken: nextPageToken,
      },
    });

    return makeCardData(items);
  }
}
