import Component from '../../core/Component.js';
import './SearchBar.js';
import './SearchResult.js';
import './NotFound.js';
import videoService, { useStore } from '../../services/VideoService.js';

class SearchModal extends Component {
  template() {
    const { isSearchQuerySubmitted, isNoResult } = useStore((state) => ({
      isSearchQuerySubmitted: state.isSearchQuerySubmitted,
      isNoResult: state.isNoResult,
    }));

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
        <search-bar class="search-input"></search-bar>
        ${
          (isSearchQuerySubmitted &&
            (isNoResult
              ? '<not-found class="search-result search-result--no-result"></not-found>'
              : '<search-result class="search-result"></search-result>')) ||
          ''
        }
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '#modal-background', () => {
      videoService.toggleSearchModal();
    });
  }
}

customElements.define('search-modal', SearchModal);

export default SearchModal;
