import Component from '../../core/Component.js';
import SearchBar from './SearchBar.js';
import SearchResult from './SearchResult.js';
import NotFound from './NotFound.js';
import api from '../../api/api.js';

export default class SearchModal extends Component {
  template() {
    const { isSearchQuerySubmitted, isNoResult } = api.rootStore.state;

    return `
    <div id="modal-background" class="dimmer"></div>
    <div
      class="search-modal"
      role="dialog"
      aria-labelledby="search-modal-title"
    >
      <h2 id="search-modal-title" class="search-modal__title">
        🔍 보고싶은 영상 찾기 🔍
      </h2>
      <section id="search-input" class="search-input"></section>
      ${
        (isSearchQuerySubmitted &&
          (isNoResult
            ? '<section id="not-found" class="search-result search-result--no-result"></section>'
            : '<section id="search-result" class="search-result"></section>')) ||
        ''
      }
    </div>
    `;
  }

  afterMounted() {
    const { isSearchQuerySubmitted, isNoResult } = api.rootStore.state;

    new SearchBar(this.$('#search-input'));
    isSearchQuerySubmitted &&
      (isNoResult
        ? new NotFound(this.$('#not-found'))
        : new SearchResult(this.$('#search-result')));
  }

  setEvent() {
    const { hideSearchModal } = this.props;

    this.addEvent('click', '#modal-background', hideSearchModal);
  }
}
