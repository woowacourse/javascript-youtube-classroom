import Component from '../../core/Component.js';
import { rootStore } from '../../store/rootStore.js';
import { searchVideos } from '../../api/api.js';
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

  setEvent() {
    this.addEvent('submit', '#search-form', async (e) => {
      const savedVideos = webStore.load();
      const { items, nextPageToken } = await searchVideos(
        e.target.elements.searchInput.value
      );
      const videos = items.map((item) => {
        return {
          loading: false,
          videoId: item.id.videoId,
          thumbnailUrl: item.snippet.thumbnails.default.url,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          publishTime: item.snippet.publishTime,
          saved: savedVideos.includes(item.id.videoId),
        };
      });

      const payload = {
        searchResult: videos,
        searchOption: {
          query: e.target.elements.searchInput.value,
          nextPageToken,
        },
      };

      rootStore.setState(payload);
    });
  }
}
