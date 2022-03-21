import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';
import { addEvent, emit } from '../utils';

class SearchForm extends CustomElement {
  template() {
    return TEMPLATE.SEARCH_FORM;
  }

  setEvent() {
    addEvent(this, 'submit', 'form', (e) => this.emitEvent(e));
  }

  emitEvent(e) {
    e.preventDefault();
    const keyword = e.target.keyword.value;

    emit('form', '@search', { keyword }, this);
  }
}

customElements.define('search-form', SearchForm);

export default SearchForm;
