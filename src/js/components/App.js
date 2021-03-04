import MenuSection from "./MenuSection.js";
import SearchModal from "./SearchModal.js";

class App {
  constructor() {}

  init() {
    this.menuSection = new MenuSection(this.openModal.bind(this));
    this.searchModal = new SearchModal();
  }

  openModal() {
    this.searchModal.showModal();
  }
}

export default App;
