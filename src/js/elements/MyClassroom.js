import CustomElement from '../abstract/CustomElement';
import TEMPLATE from '../templates';
import { addEvent, $ } from '../utils';

import './MyResult';

class MyClassroom extends CustomElement {
  template() {
    return TEMPLATE.MY_CLASSROOM;
  }

  setEvent() {
    addEvent(this, 'click', '#search-modal-button', this.showSearchModal);
    addEvent(this, 'click', '.menu', (e) => $('my-result', this).switchMenu(e));
  }

  showSearchModal() {
    $('.modal-container').classList.remove('hide');
  }
}

customElements.define('my-classroom', MyClassroom);

export default MyClassroom;
