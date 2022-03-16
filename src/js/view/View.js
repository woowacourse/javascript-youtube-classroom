import { selectDom } from '../util/util';
import SavedVideosView from './SavedVideosView';
import SearchModalView from './SearchModalView';

class View {
  constructor(search, saveToStorage) {
    this.modalContainer = selectDom('.modal-container');

    this.search = search;
    this.savedVideosView = new SavedVideosView();

    this.searchModalView = new SearchModalView(search, saveToStorage);

    this.tabButtons = document.querySelectorAll('.tab-button');
    this.tabButtons.forEach((button) => button.addEventListener('click', this.handleTabSwitch));

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

  handleTabSwitch = async ({ target }) => {
    const { dataset } = target;
    this.tabButtons.forEach((button) => button.classList.remove('current'));
    target.classList.add('current');
    await this.savedVideosView.changeTab(dataset.tabName);
  };
}

export default View;
