import MenuBar from "./MenuBar.js";
import SearchModal from "./SearchModal/index.js";

export default class App {
  constructor() {
    this.menuBar = new MenuBar({ handleOpenModal: this.handleOpenModal });
    this.searchModal = new SearchModal();
  }

  handleOpenModal = () => {
    this.searchModal.openModal();
  };
}
