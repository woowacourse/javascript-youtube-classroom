import CustomElement from '../abstract/CustomElement';
import { addEvent, emit, $ } from '../utils';
import TEMPLATE from '../templates';

class SearchForm extends CustomElement {
  template() {
    return TEMPLATE.SEARCH_FORM;
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
