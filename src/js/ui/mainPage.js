import SearchModal from './searchModal.js';

class MainPage {
  constructor() {
    this.$searchModalButton = document.querySelector('#search-modal-button');
    this.searchModal = new SearchModal();
    this.$dimmer = document.querySelector('.dimmer');
  }

  init() {
    this.$searchModalButton.addEventListener(
      'click',
      this.searchModal.toggleModalContainerView.bind(this.searchModal),
    );
    this.$dimmer.addEventListener('click', this.searchModal.initModalState.bind(this.searchModal));
  }
}

export default MainPage;
