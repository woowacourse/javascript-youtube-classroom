import { CUSTOM_EVENT_KEY } from '../constants/events';
import { dispatch } from '../modules/eventFactory';
import Component from './Component';

class SearchFormComponent extends Component {
  $searchButton = null;

  $searchInput = null;

  constructor(parentElement) {
    super(parentElement);
    this.mount();
    this.initDOM();
    this.bindEventHandler();
  }

  mount() {
    const template = this.generateTemplate();

    this.parentElement.insertAdjacentHTML('beforeend', template);
  }

  initDOM() {
    this.$searchButton = this.parentElement.querySelector('#search-button');
    this.$searchInput = this.parentElement.querySelector('#search-input-keyword');
  }

  bindEventHandler() {
    this.$searchButton.addEventListener('click', () => {
      const { value } = this.$searchInput;
      dispatch(CUSTOM_EVENT_KEY.SUBMIT_SEARCH_KEWORD, {
        detail: {
          keyword: value,
        },
      });
    });

    this.$searchInput.addEventListener('keypress', (e) => {
      const { value } = this.$searchInput;
      if (e.key === 'Enter') {
        dispatch(CUSTOM_EVENT_KEY.SUBMIT_SEARCH_KEWORD, {
          detail: {
            keyword: value,
          },
        });
      }
    });
  }

  generateTemplate() {
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
