import Component from '../../core/Component.js';
import { rootStore } from '../../store/rootStore.js';
import { getSavedVideos, searchVideos } from '../../api/api.js';
import { debounce } from '../../utils/commons.js';
import { SUBMIT_WAIT } from '../../config/constants.js';

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
    this.addEvent(
      'submit',
      '#search-form',
      debounce(this.onSubmitSearchInput.bind(this), SUBMIT_WAIT)
    );
  }

  async onSubmitSearchInput(e) {
    const query = e.target.elements.searchInput.value;

    rootStore.setState({ isSearchQuerySubmitted: true });

    const data = await searchVideos(query).catch((err) => {
      alert(err);
    });

    if (data.items)
      this.updateSearchResult(data.items, {
        query,
        nextPageToken: data.nextPageToken,
      });
  }

  updateSearchResult(items, searchOption) {
    const savedVideos = getSavedVideos();
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

    rootStore.setState({
      isNoResult: !items.length,
      searchResult: videos,
      searchOption,
    });
  }
}
