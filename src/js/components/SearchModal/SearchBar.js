import { getSearchAPI } from '../../api/api.js';
import Component from '../../core/Component.js';
import { rootStore } from '../../store/rootStore.js';
import { webStore } from '../../store/WebStore.js';

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
      try {
        rootStore.setState({ isLoading: true });
        const { items, nextPageToken } = await getSearchAPI(
          e.target.elements.searchInput.value
        );
        if (!items.length) {
          rootStore.setState({ notFound: true });

          return;
        }
        rootStore.setState({
          searchOption: {
            query: e.target.elements.searchInput.value,
            pageToken: nextPageToken,
          },
          videos: addSavedToVideos(items),
          notFound: false,
          isLoading: false,
        });
      } catch ({ message }) {
        console.log('message', message);
      }
    });
  }
}

export function addSavedToVideos(rawVideos) {
  const savedVideos = webStore.load();

  return rawVideos.map(
    ({
      id: { videoId },
      snippet: {
        thumbnails: {
          default: { url: thumbnailUrl },
        },
        title,
        channelTitle,
        publishTime,
      },
    }) => ({
      videoId,
      thumbnailUrl,
      title,
      channelTitle,
      publishTime,
      saved: savedVideos.includes(videoId),
    })
  );
}
