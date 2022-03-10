import Component from '../../core/Component.js';
import SearchBar from './SearchBar.js';
import SearchResult from './SearchResult.js';
import NotFound from './NotFound.js';

export default class SearchModal extends Component {
  template() {
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
      <section id="search-result" class="search-result"></section>
      <section id="not-found" class="search-result search-result--no-result"></section>
    </div>
    `;
  }

  afterMounted() {
    new SearchBar(this.$('#search-input'));
    new SearchResult(this.$('#search-result'));
    // new NotFound(this.$('#not-found'))
  }

  setEvent() {
    const { hideSearchModal } = this.props;

    this.addEvent('click', '#modal-background', hideSearchModal);
  }
}
