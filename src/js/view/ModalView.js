export default class ModalView {
  constructor() {
    this.registerDOM();
  }

  registerDOM() {
    this.$modalContainer = document.querySelector('.modal-container');
    this.$dimmer = document.querySelector('.dimmer');
  }

  showModal() {
    this.$modalContainer.classList.remove('hide');
  }

  hideModal() {
    this.$modalContainer.classList.add('hide');
  }

  bindOnClickDimmer(callback) {
    this.$dimmer.addEventListener('click', callback);
  }
}
