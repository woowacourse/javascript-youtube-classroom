import { Router, SavedVideoManager } from '../model/index.js';
import { Navigation, SearchVideoModal, SavedVideo } from './index.js';
import { FILTER } from '../constants/index.js';

export class App {
  constructor() {
    this.filter = FILTER.WATCH;

    this.savedVideoManager = new SavedVideoManager();
    this.navigation = new Navigation({
      handleOpenModal: this.handleOpenModal.bind(this),
    });
    this.router = new Router({ onChangePage: this.handleFilter.bind(this) });
    this.savedVideo = new SavedVideo({
      savedVideoManager: this.savedVideoManager,
      filter: this.filter,
    });
    this.searchVideoModal = new SearchVideoModal({ savedVideoManager: this.savedVideoManager });
  }

  handleFilter(filter) {
    this.setState({ filter });
  }

  handleOpenModal() {
    this.searchVideoModal.openModal();
  }

  setState({ filter }) {
    this.filter = filter;
    this.savedVideo.setState({ filter: this.filter });
  }
}
