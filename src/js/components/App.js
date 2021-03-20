import { SavedVideoManager } from '../model/index.js';
import { Navigation, SearchVideoModal, SavedVideo } from './index.js';

export class App {
  constructor() {
    this.savedVideoManager = new SavedVideoManager();
    this.savedVideo = new SavedVideo({
      savedVideoManager: this.savedVideoManager,
      isChecked: false,
      isLiked: false,
    });
    this.navigation = new Navigation({
      savedVideo: this.savedVideo,
      handleOpenModal: this.handleOpenModal.bind(this),
    });
    this.searchVideoModal = new SearchVideoModal({ savedVideoManager: this.savedVideoManager });

    this.isChecked = false;
    this.isLiked = false;
  }

  handleOpenModal() {
    this.searchVideoModal.openModal();
  }
}
