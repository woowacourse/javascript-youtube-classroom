import CustomElement from '../abstract/CustomElement';
import { addEvent, $ } from '../utils';
import TEMPLATE from '../templates';

class MyClassroom extends CustomElement {
  template() {
    return TEMPLATE.MY_CLASSROOM;
  }

  setEvent() {
    addEvent(this, 'click', '#search-modal-button', this.showModal);
  }

  showModal() {
    $('.modal-container').classList.remove('hide');
  }
}

customElements.define('my-classroom', MyClassroom);

export default MyClassroom;
