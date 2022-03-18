import { selectDom } from './util/util';
import SavedVideosView from './SavedVideosView/SavedVideosView';
import SearchModalView from './SearchModal/SearchModalView';

class View {
  constructor() {
    this.savedVideosView = new SavedVideosView();
    this.searchModalView = new SearchModalView();

    this.tabButtons = document.querySelectorAll('.tab-button');
    this.tabButtons.forEach((button) => button.addEventListener('click', this.handleTabSwitch));

    selectDom('#search-modal-button').addEventListener('click', this.handleModalToggle);
    selectDom('.dimmer').addEventListener('click', this.handleModalToggle);
  }

  handleModalToggle = () => {
    this.searchModalView.toggleModal(this.savedVideosView.renderOnModalClose);
  };

  handleTabSwitch = async ({ target }) => {
    const { dataset } = target;

    this.tabButtons.forEach((button) => button.classList.remove('current'));
    target.classList.add('current');

    await this.savedVideosView.renderTab(dataset.tabName);
  };
}

export default View;
