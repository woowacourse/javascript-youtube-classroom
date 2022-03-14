import CustomElement from '../abstract/CustomElement';
import { addEvent, $ } from '../utils';
import TEMPLATE from '../templates';

class SearchModal extends CustomElement {
  template() {
    return TEMPLATE.SEARCH_MODAL;
  }

  setEvent() {
    addEvent({
      component: this,
      eventType: 'click',
      selector: '.dimmer',
      callback: this.hideSearchModal,
    });
  }

  hideSearchModal() {
    $('.modal-container').classList.add('hide');
  }
}

customElements.define('search-modal', SearchModal);

export default SearchModal;
