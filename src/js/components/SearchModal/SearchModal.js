import Component from '../../core/Component.js';
import NotFound from './NotFound.js';
import SearchBar from './SearchBar.js';
import SearchResult from './SearchResult.js';

export default class SearchModal extends Component {
  setup() {
    this.state = { items: [], isNoResult: false, nextPageToken: null };
  }

  template() {
    const { isNoResult } = this.state;

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
      isNoResult
        ? '<section id="not-found" class="search-result search-result--no-result"></section>'
        : '<section id="search-result" class="search-result"></section>'
    }
    </div>
    `;
  }

  afterMounted() {
    const { items, isNoResult, nextPageOption } = this.state;

    new SearchBar(this.$('#search-input'), {
      showSearchResult: this.showSearchResult.bind(this),
      setNextPageOption: this.setNextPageOption.bind(this),
    });
    isNoResult
      ? new NotFound(this.$('#not-found'))
      : new SearchResult(this.$('#search-result'), {
          items,
          nextPageOption,
        });
  }

  setEvent() {
    const { hideSearchModal } = this.props;

    this.addEvent('click', '#modal-background', hideSearchModal);
  }

  showSearchResult(items) {
    this.setState({ items, isNoResult: !items.length });
  }

  setNextPageOption(nextPageOption) {
    this.setState({ nextPageOption });
  }
}
