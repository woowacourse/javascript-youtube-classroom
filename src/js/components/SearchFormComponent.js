import Component from './Component';

class SearchFormComponent extends Component {
  constructor(parentElement, state) {
    super(parentElement, state);
    this.mount();
  }

  mount() {
    const template = this.generateTemplate();

    this.parentElement.insertAdjacentHTML('beforeend', template);
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
