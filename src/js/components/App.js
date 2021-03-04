import { SavedVideoManager } from '../model/index.js';
import { Navigation, SearchVideoModal, SavedVideo } from './index.js';

export class App {
  constructor() {
    this.savedVideoManager = new SavedVideoManager();
    this.navigation = new Navigation({
      handleIsCompleted: this.handleIsCompleted.bind(this),
      handleOpenModal: this.handleOpenModal.bind(this),
    });
    this.savedVideo = new SavedVideo({
      savedVideoManager: this.savedVideoManager,
      isCompleted: false,
    });
    this.searchVideoModal = new SearchVideoModal({ savedVideoManager: this.savedVideoManager });

    this.isCompleted = false;
  }

  handleIsCompleted(isCompleted) {
    this.setState({ isCompleted });
  }

  handleOpenModal() {
    this.searchVideoModal.openModal();
  }

  setState({ isCompleted }) {
    this.isCompleted = isCompleted;
    this.savedVideo.setState({ isCompleted: this.isCompleted });
  }
}
