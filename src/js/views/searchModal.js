import { $ } from '../utils/index.js';
import { SELECTOR } from '../constants/index.js';
import videoTemplate from '../videoTemplate.js';

const searchModalView = {
  bindKeywordInputSubmit(handler) {
    $(SELECTOR.SEARCH_FORM).addEventListener('submit', async (e) => {
      e.preventDefault();
      handler($(SELECTOR.SEARCH_INPUT_KEYWORD).value);
    });
  },

  appendVideos(videos) {
    $(SELECTOR.VIDEOS).insertAdjacentHTML(
      'beforeend',
      videos.map(({ id, snippet }) => videoTemplate(id, snippet)).join('')
    );
  },

  launchCloseModal() {
    const closeModal = () => $(SELECTOR.SEARCH_MODAL).classList.add('hide');

    $(SELECTOR.MODAL_BACKGROUND).addEventListener('click', closeModal);

    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  },

  renderScreenByVideos(videos) {
    if (videos.length > 0) {
      this.refreshVideoScreen();
      this.appendVideos(videos);
      this.renderVideoScreen();
    } else {
      this.renderEmptyScreen();
    }
  },

  refreshVideoScreen() {
    $(SELECTOR.VIDEOS).innerHTML = '';
  },

  setScreen(order) {
    $(SELECTOR.SEARCH_MODAL).classList[order]('empty');
  },

  renderVideoScreen() {
    this.setScreen('remove');
  },

  renderEmptyScreen() {
    this.setScreen('add');
  },
};

export default searchModalView;
