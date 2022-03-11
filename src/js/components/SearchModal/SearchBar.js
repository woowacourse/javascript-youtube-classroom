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

  setEvent() {
    this.addEvent('submit', '#search-form', async (e) => {
      try {
        const { items, nextPageToken } = await getSearchAPI(
          e.target.elements.searchInput.value
        );
        // const { items, pageToken } = await request();
        if (!items.length) {
          rootStore.setState({ notFound: true });

          return;
        }
        rootStore.setState({
          searchOption: {
            query: e.target.elements.searchInput.value,
            pageToken: nextPageToken,
          },
          searchResult: addSavedToVideos(items),
          notFound: false,
        });
      } catch ({ message }) {
        console.log('message', message);
      }
    });
  }
}

export function addSavedToVideos(videos) {
  const savedVideos = webStore.load();

  return videos.map((item) => ({
    videoId: item.id.videoId,
    thumbnailUrl: item.snippet.thumbnails.default.url,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    publishTime: item.snippet.publishTime,
    saved: savedVideos.includes(item.id.videoId),
  }));
}
