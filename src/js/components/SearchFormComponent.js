import { ERROR_MESSAGE } from '../constants/errorMessage';
import { CUSTOM_EVENT_KEY } from '../constants/events';
import { dispatch } from '../modules/eventFactory';
import { isEmptyKeyword } from '../utils/validation';

class SearchFormComponent {
  $searchButton = null;

  $searchInput = null;

  #parentElement;

  constructor(parentElement) {
    this.#parentElement = parentElement;
    this.#mount();
    this.#initDOM();
    this.#bindEventHandler();
  }

  #mount() {
    const template = this.#generateTemplate();
    this.#parentElement.insertAdjacentHTML('beforeend', template);
  }

  #initDOM() {
    this.$searchButton = this.#parentElement.querySelector('#search-button');
    this.$searchInput = this.#parentElement.querySelector('#search-input-keyword');
  }

  #bindEventHandler() {
    this.$searchButton.addEventListener('click', () => {
      this.#dispatchSubmitSearchKeyword();
    });
    this.$searchInput.addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') {
        return;
      }
      this.#dispatchSubmitSearchKeyword();
    });
  }

  #dispatchSubmitSearchKeyword() {
    const { value } = this.$searchInput;
    if (isEmptyKeyword(value)) {
      alert(ERROR_MESSAGE.EMPTY_KEYWORD);
      return;
    }
    dispatch(CUSTOM_EVENT_KEY.SUBMIT_SEARCH_KEYWORD, {
      detail: {
        keyword: value,
      },
    });
  }

  #generateTemplate() {
    return `
        <section class="search-input">
            <h3 hidden>검색어 입력</h3>
            <input id="search-input-keyword" type="text" placeholder="검색" class="search-input__keyword">
            <button id="search-button" class="search-input__search-button button">검색</button>
        </section>
    `;
  }
}
export default SearchFormComponent;
