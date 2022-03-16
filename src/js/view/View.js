import { selectDom } from '../util/util';
import SavedVideosView from './SavedVideosView';
import SearchModalView from './SearchModalView';

class View {
  constructor(search, saveVideos) {
    this.modalContainer = selectDom('.modal-container');

    this.search = search;
    this.savedVideosView = new SavedVideosView();

    this.searchModalView = new SearchModalView(search, saveVideos);

    this.#attachEventListeners();
  }

  #attachEventListeners() {
    const searchModalButton = selectDom('#search-modal-button');
    searchModalButton.addEventListener('click', this.handleModalToggle);

    const dimmer = selectDom('.dimmer', this.modalContainer);
    dimmer.addEventListener('click', this.handleModalToggle);
  }

  handleModalToggle = () => {
    this.searchModalView.toggleModal(this.savedVideosView.renderVideoList);
  };
}

export default View;
