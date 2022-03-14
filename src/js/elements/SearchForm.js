import CustomElement from '../abstract/CustomElement';
import { addEvent, emit, $ } from '../utils';
import TEMPLATE from '../templates';

class SearchForm extends CustomElement {
  template() {
    return TEMPLATE.SEARCH_FORM;
  }

  setEvent() {
    addEvent(this, 'submit', '.search-form', (e) => this.emitEvent(e));
  }

  emitEvent(e) {
    e.preventDefault();
    const keyword = $('#search-input-keyword').value;

    emit('.search-form', '@search', { keyword }, this);
  }
}

customElements.define('search-form', SearchForm);

export default SearchForm;
