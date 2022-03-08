export default class MainView {
  constructor() {
    this.registerDOM();
  }

  registerDOM() {
    this.modalOpenButton = document.getElementById('search-modal-button');
  }

  bindModalOpenButton(callback) {
    this.modalOpenButton.addEventListener('click', event => {
      event.preventDefault();
      callback();
    });
  }
}
