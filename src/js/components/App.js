import MenuSection from "./MenuSection.js";
import SearchModal from "./SearchModal.js";
import VideoView from "./VideoView.js";

class App {
  init() {
    this.videoView = new VideoView();
    this.searchModal = new SearchModal({ changeMenu: this.changeMenu.bind(this) });
    this.menuSection = new MenuSection({
      openModal: this.openModal.bind(this),
      changeMenu: this.changeMenu.bind(this),
    });
  }

  openModal() {
    this.searchModal.showModal();
  }

  changeMenu(clickedMenu) {
    this.videoView.setState({ clickedMenu });
    this.menuSection.setState({ clickedMenu });
  }
}

export default App;
