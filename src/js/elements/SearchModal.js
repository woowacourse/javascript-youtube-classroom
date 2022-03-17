import CustomElement from '../abstract/CustomElement';
import { addEvent, $ } from '../utils';
import TEMPLATE from '../templates';

import './SearchForm';
import './SearchResult';

class SearchModal extends CustomElement {
  template() {
    return TEMPLATE.SEARCH_MODAL;
  }

  setEvent() {
    addEvent(this, 'click', '.dimmer', this.hideSearchModal);
  }

  hideSearchModal() {
    $('.modal-container').classList.add('hide');
  }
}

customElements.define('search-modal', SearchModal);

export default SearchModal;
