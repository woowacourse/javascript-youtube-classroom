export default class View {
  constructor() {
    this.searchModalButton = document.querySelector('#search-modal-button');
    this.modalContainer = document.querySelector('.modal-container');
    this.searchModalButton.addEventListener('click', this.#openModal);
  }

  #openModal = () => {
    this.modalContainer.classList.remove('hide');
  };
}
