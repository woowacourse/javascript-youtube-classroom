import CustomElement from '../../abstract/CustomElement';
import { addEvent, emit, $ } from '../../utils';

class SearchForm extends CustomElement {
  template() {
    return `
      <form class="search-form">
        <h3 hidden>검색어 입력</h3>
        <input
          id="search-input-keyword"
          placeholder="검색"
          class="search-input__keyword"
          required
        />
        <button id="search-button" class="search-input__search-button button">검색</button>
      </form>
    `;
  }

  setEvent() {
    addEvent({
      component: this,
      eventType: 'submit',
      selector: '.search-form',
      callback: (e) => this.emitEvent(e),
    });
  }

  emitEvent(e) {
    e.preventDefault();
    const keyword = $('#search-input-keyword').value;

    emit({ selector: '.search-form', eventName: '@search', detail: { keyword }, component: this });
  }
}

customElements.define('search-form', SearchForm);

export default SearchForm;
