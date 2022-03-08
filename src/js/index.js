import { SELECTOR } from './constants/index.js';
import { $ } from './utils/index.js';

$(SELECTOR.SEARCH_MODAL_BUTTON).addEventListener('click', () => {
  $(SELECTOR.SEARCH_MODAL).classList.remove('hide');
});

const closeModal = () => $(SELECTOR.SEARCH_MODAL).classList.add('hide');

$(SELECTOR.MODAL_BACKGROUND).addEventListener('click', closeModal);

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
