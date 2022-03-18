import CustomElement from '../abstract/CustomElement';
import { addEvent, $ } from '../utils';
import TEMPLATE from '../templates';

import './MyResult';

class MyClassroom extends CustomElement {
  template() {
    return TEMPLATE.MY_CLASSROOM;
  }

  setEvent() {
    addEvent(this, 'click', '#search-modal-button', this.showSearchModal);
  }

  showSearchModal() {
    $('.modal-container').classList.remove('hide');
  }
}

customElements.define('my-classroom', MyClassroom);

export default MyClassroom;
