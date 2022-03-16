import Component from '../../core/Component.js';
import api from '../../api/api.js';
import { throttle } from '../../utils/commons.js';
import { SUBMIT_WAIT } from '../../config/constants.js';
import { queryStringValidator, validate } from '../../utils/validator.js';

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
          autofocus
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
      throttle(this.onSubmitSearchInput.bind(this), SUBMIT_WAIT)
    );
  }

  async onSubmitSearchInput(e) {
    const query = e.target.elements.searchInput.value.trim();

    try {
      validate(query, queryStringValidator, {
        log: process.env.NODE_ENV === 'development',
      });

      await api.searchVideos(query);
    } catch (err) {
      alert(err);
    }
  }
}
