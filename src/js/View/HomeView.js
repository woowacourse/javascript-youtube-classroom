import { $ } from '../util';

export default class HomeView {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    $('#search-modal-button').addEventListener('click', this.openModal.bind(this));
  }

  openModal() {
    $('#modal-container').classList.remove('hide');
  }
}
