import SearchManager from "../manager/SearchManager.js";
import MenuBar from "./MenuBar.js";
import SearchModal from "./SearchModal.js";

export default class App {
  constructor() {
    this.searchManager = new SearchManager();
    this.menuBar = new MenuBar({ openModal: this.openModal });
    this.searchModal = new SearchModal({ searchManager: this.searchManager });
  }

  openModal = () => {
    this.searchModal.show();
  };
}
