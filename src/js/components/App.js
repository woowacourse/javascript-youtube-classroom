import SearchManager from "../manager/SearchManager.js";
import MenuBar from "./MenuBar.js";
import SearchModal from "./SearchModal/index.js";

export default class App {
  constructor() {
    this.searchManager = new SearchManager();
    this.menuBar = new MenuBar({ handleOpenModal: this.handleOpenModal });
    this.searchModal = new SearchModal({ searchManager: this.searchManager });
  }

  handleOpenModal = () => {
    this.searchModal.openModal();
  };
}
