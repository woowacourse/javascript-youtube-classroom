import { getSearchAPI } from '../../api/api.js';
import Component from '../../core/Component.js';
import { rootStore } from '../../store/rootStore.js';
import { webStore } from '../../store/WebStore.js';
import request from '../../__mocks__/request.js';

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
    this.addEvent('submit', '#search-form', async e => {
      const query = e.target.elements.searchInput.value;
      if (!query) return;

      rootStore.setState({ isLoading: true });

      // const [error, data] = await getSearchAPI(query);
      const [error, data] = await request();
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
        videos: makeCardData(items),
        status: { notFound: false, statusCode: 200 },
        isLoading: false,
      });
    });
  }
}

// TODO: test
export function makeCardData(rawVideos) {
  return addSavedToVideos(extractCardData(rawVideos));
}

function addSavedToVideos(videos) {
  const savedVideos = webStore.load();

  // TODO: 이중 for문 해결
  return videos.map(video => {
    const saved = !!savedVideos.find(
      savedVideo => savedVideo.videoId === video.videoId
    );
    return { ...video, saved };
  });
}

function extractCardData(rawVideos) {
  return rawVideos.map(({ id, snippet }) => {
    return {
      videoId: id.videoId,
      thumbnailUrl: snippet.thumbnails.default.url,
      title: snippet.title,
      channelTitle: snippet.channelTitle,
      publishTime: snippet.publishTime,
    };
  });
}
