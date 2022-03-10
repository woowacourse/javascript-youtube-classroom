import { $ } from '../utils/index.js';
import { SELECTOR } from '../constants/index.js';

const classRoomView = {
  launchOpenModal() {
    $(SELECTOR.SEARCH_MODAL_BUTTON).addEventListener('click', () => {
      $(SELECTOR.SEARCH_MODAL).classList.remove('hide');
    });
  },
};

export default classRoomView;
