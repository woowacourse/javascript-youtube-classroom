import videoTemplate from './videoTemplate.js';
import YoutubeAPI from './YoutubeAPI/index.js';
import ValidationError from './ValidationError/index.js';
import { SELECTOR } from './constants/index.js';
import { $ } from './utils/index.js';
import { checkKeyword } from './Validator/index.js';

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

const youtubeAPI = new YoutubeAPI();

$(SELECTOR.SEARCH_FORM).addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const keyword = $(SELECTOR.SEARCH_INPUT_KEYWORD).value;

    checkKeyword(keyword);

    const videos = await youtubeAPI.search(keyword);
    $(SELECTOR.VIDEOS).insertAdjacentHTML(
      'beforeend',
      videos.map(({ id, snippet }) => videoTemplate(id, snippet)).join('')
    );
  } catch (error) {
    if (error instanceof ValidationError) {
      alert(error.message);
      return;
    }

    throw error;
  }
});
