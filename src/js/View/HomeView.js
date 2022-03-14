import { $ } from '../util';

export default class HomeView {
  constructor() {
    $('#search-modal-button').addEventListener('click', this.openModal.bind(this));
  }

  openModal() {
    $('#modal-container').classList.remove('hide');
  }
}
