import { getSearchAPI } from '../../api/api.js';
import Component from '../../core/Component.js';
import { savedVideosStorage } from '../../localStorage/savedVideos.js';
import { rootStore } from '../../store/rootStore.js';
import throttle from '../../utils/throttle.js';
import { requestMockData } from '../../__mocks__/request.js';

export default class SearchBar extends Component {
  template() {
    return `
      <form id="search-form" >
        <label for="search-input-keyword" hidden>검색어 입력</label>
        <input
          id="search-input-keyword"
          type="text"
          placeholder="검색"
          class="search-input__keyword"
          name="searchInput"
        />
        <button
          type="submit"
          id="search-button"
          class="search-input__search-button button"
        >
          검색
        </button>
      </form>
    `;
  }

  afterMounted() {
    this.$('#search-input-keyword').focus();
  }

  setEvent() {
    this.addEvent(
      'submit',
      '#search-form',
      throttle(this.handleSubmit.bind(this), 300)
    );
  }

  async handleSubmit(e) {
    e.preventDefault();
    const query = e.target.elements.searchInput.value;
    if (!query) return;

    rootStore.setState({ isLoading: true });

    const [error, data] = await getSearchAPI(
      query,
      null,
      requestMockData.success
    );

    if (error) {
      rootStore.setState({
        isLoading: false,
        status: { notFound: true, statusCode: error.statusCode },
      });

      return;
    }

    const { items, nextPageToken } = data;
    if (!items.length) {
      rootStore.setState({
        status: { notFound: true, statusCode: 200 },
      });

      return;
    }

    rootStore.setState({
      searchOption: {
        query,
        pageToken: nextPageToken,
      },
      videos: makeCardData(items, savedVideosStorage.load()),
      status: { notFound: false, statusCode: 200 },
      isLoading: false,
    });
  }
}

export function makeCardData(rawVideos, savedVideos) {
  return addSavedToVideos(extractCardData(rawVideos), savedVideos);
}

function addSavedToVideos(videos, savedVideos) {
  const result = videos.map(video => {
    const saved = savedVideos.some(
      savedVideo => savedVideo.videoId === video.videoId
    );
    return { ...video, saved };
  });

  return result;
}

function extractCardData(rawVideos) {
  const result = rawVideos.map(({ id, snippet }) => {
    return {
      videoId: id.videoId,
      thumbnailUrl: snippet.thumbnails.default.url,
      title: snippet.title,
      channelTitle: snippet.channelTitle,
      publishTime: snippet.publishTime,
    };
  });

  return result;
}
