import Component from '../../core/Component.js';
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
    const { showSearchResult } = this.props;

    this.addEvent('submit', '#search-form', async (e) => {
      const data = await request();

      showSearchResult(data.items);
    });
  }
}
