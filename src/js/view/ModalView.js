export default class ModalView {
  constructor() {
    this.registerDOM();
  }

  registerDOM() {
    this.modalContainer = document.querySelector('.modal-container');
  }

  showModal() {
    this.modalContainer.classList.remove('hide');
  }
}
