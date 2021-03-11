import MenuSection from "./MenuSection.js";
import SearchModal from "./SearchModal.js";
import VideoView from "./VideoView.js";

class App {
  constructor() {}

  init() {
    this.searchModal = new SearchModal();
    this.menuSection = new MenuSection({ openModal: this.openModal.bind(this) });
    this.videoView = new VideoView();
  }

  openModal() {
    this.searchModal.showModal();
  }
}

export default App;
