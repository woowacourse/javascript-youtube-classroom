import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';
import { addEvent, $ } from '../utils';

import './SearchForm';
import './SearchResult';

class SearchModal extends CustomElement {
  template() {
    return TEMPLATE.SEARCH_MODAL;
  }

  setEvent() {
    addEvent(this, 'click', '.dimmer', () => this.hideSearchModal());
  }

  hideSearchModal() {
    $('.modal-container', this).classList.add('hide');
  }
}

customElements.define('search-modal', SearchModal);

export default SearchModal;
