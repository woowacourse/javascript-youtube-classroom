import CustomElement from '../../abstract/CustomElement';
import { addEvent, $ } from '../../utils';

import './SearchForm';
import './SearchResult';

class SearchModal extends CustomElement {
  template() {
    return `
      <div class="modal-container hidden">
        <div class="dimmer"></div>
        <div class="search-modal" role="dialog" aria-labelledby="search-modal-title">
          <h2 id="search-modal-title" class="search-modal__title">🔍 보고싶은 영상 찾기 🔍</h2>
          <search-form></search-form>
          <search-result></search-result>
        </div>
      </div>
    `;
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
    $('.modal-container').classList.add('hidden');
  }
}

customElements.define('search-modal', SearchModal);

export default SearchModal;
