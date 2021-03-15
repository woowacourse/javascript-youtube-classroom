import MenuSection from "./MenuSection.js";
import SearchModal from "./SearchModal.js";

class App {
  constructor() {}

  init() {
    this.searchModal = new SearchModal();
    this.menuSection = new MenuSection({ openModal: this.openModal.bind(this) });
  }

  openModal() {
    this.searchModal.showModal();
  }
}

export default App;
