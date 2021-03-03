import { Navigation, SearchVideoModal } from './index.js'

export class App {
  constructor() {
    this.searchVideoModal = new SearchVideoModal();
    this.navigation = new Navigation({ handleOpenModal: this.handleOpenModal.bind(this) });
  }

  handleOpenModal() {
    this.searchVideoModal.openModal();
  }

}
