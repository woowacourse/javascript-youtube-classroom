import { SavedVideoManager } from '../model/index.js';
import { Navigation, SearchVideoModal, SavedVideo } from './index.js';

export class App {
  constructor() {
    this.savedVideoManager = new SavedVideoManager();
    this.navigation = new Navigation({
      handleIsChecked: this.handleIsChecked.bind(this),
      handleIsLiked: this.handleIsLiked.bind(this),
      handleOpenModal: this.handleOpenModal.bind(this),
    });
    this.savedVideo = new SavedVideo({
      savedVideoManager: this.savedVideoManager,
      isChecked: false,
      isLiked: false,
    });
    this.searchVideoModal = new SearchVideoModal({ savedVideoManager: this.savedVideoManager });

    this.isChecked = false;
    this.isLiked = false;
  }

  handleIsChecked(isChecked) {
    this.setState({ isChecked });
  }

  handleIsLiked(isLiked) {
    this.setState({ isLiked });
  }

  handleOpenModal() {
    this.searchVideoModal.openModal();
  }

  setState({ isChecked, isLiked }) {
    this.isChecked = isChecked ?? this.isChecked;
    this.isLiked = isLiked ?? this.isLiked;
    this.savedVideo.setState({ isChecked: this.isChecked, isLiked: this.isLiked });
  }
}
