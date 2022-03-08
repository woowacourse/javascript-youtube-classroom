import { SELECTOR } from './constants/index.js';
import { $ } from './utils/index.js';

$(SELECTOR.SEARCH_MODAL_BUTTON).addEventListener('click', () => {
  $(SELECTOR.SEARCH_MODAL).classList.remove('hide');
});
