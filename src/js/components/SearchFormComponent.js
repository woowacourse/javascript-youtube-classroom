import Component from './Component';

class SearchFormComponent extends Component {
  $searchButton = null;

  $searchInput = null;

  constructor({ parentElement, handlers }) {
    super(parentElement);
    this.mount();
    this.bindEventHandler(handlers);
  }

  mount() {
    const template = this.generateTemplate();

    this.parentElement.insertAdjacentHTML('beforeend', template);

    this.$searchButton = this.parentElement.querySelector('#search-button');
    this.$searchInput = this.parentElement.querySelector('#search-input-keyword');
  }

  bindEventHandler({ onSubmitSearchKeyword }) {
    this.$searchButton.addEventListener('click', async () => {
      const { value } = this.$searchInput;
      await onSubmitSearchKeyword(value);
    });

    this.$searchInput.addEventListener('keypress', async (e) => {
      const { value } = this.$searchInput;
      if (e.key === 'Enter') {
        await onSubmitSearchKeyword(value);
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
