import { Router, SavedVideoManager } from '../model/index.js';
import { Navigation, SearchVideoModal, SavedVideo } from './index.js';

export class App {
  constructor() {
    this.savedVideoManager = new SavedVideoManager();
    this.navigation = new Navigation({
      handleIsChecked: this.handleIsChecked.bind(this),
      handleOpenModal: this.handleOpenModal.bind(this),
    });
    this.router = new Router({ onChangePage: this.handleIsChecked.bind(this) });
    this.savedVideo = new SavedVideo({
      savedVideoManager: this.savedVideoManager,
      isChecked: false,
    });
    this.searchVideoModal = new SearchVideoModal({ savedVideoManager: this.savedVideoManager });

    this.isChecked = false;
  }

  handleIsChecked(isChecked) {
    this.setState({ isChecked });
  }

  handleOpenModal() {
    this.searchVideoModal.openModal();
  }

  setState({ isChecked }) {
    this.isChecked = isChecked;
    this.savedVideo.setState({ isChecked: this.isChecked });
  }
}
