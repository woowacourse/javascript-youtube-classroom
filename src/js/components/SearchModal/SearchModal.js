import Component from '../../core/Component.js';
import SearchBar from './SearchBar.js';
import SearchResult from './SearchResult/SearchResult.js';
import NotFound from './NotFound.js';
import { rootStore } from '../../store/rootStore.js';
import { EXCEPTION_MESSAGE } from '../../constant.js';

export default class SearchModal extends Component {
  template() {
    const { notFound, statusCode } = rootStore.state.status;

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
        notFound || statusCode !== 200
          ? `<section id="not-found" class="search-result search-result--no-result"></section>`
          : `<section id="search-result" class="search-result"></section>`
      }
    </div>
    `;
  }

  afterMounted() {
    const { notFound, statusCode } = rootStore.state.status;

    new SearchBar(this.$('#search-input'));

    if (notFound || statusCode !== 200) {
      new NotFound(this.$('#not-found'), {
        message: `${EXCEPTION_MESSAGE[statusCode] || EXCEPTION_MESSAGE.OTHERS}`,
      });

      return;
    }

    new SearchResult(this.$('#search-result'));
  }

  setEvent() {
    this.addEvent('click', '#modal-background', this.props.toggleSearchModal);
  }
}
