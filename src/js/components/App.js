import SaveVideoManager from "../manager/SaveVideoManager.js";
import Classroom from "./Classroom.js";
import MenuBar from "./MenuBar.js";
import SearchModal from "./SearchModal/index.js";

export default class App {
  constructor() {
    this.saveVideoManager = new SaveVideoManager();
    this.menuBar = new MenuBar({ handleOpenModal: this.handleOpenModal });
    this.searchModal = new SearchModal({ saveVideoManager: this.saveVideoManager });
    this.classroom = new Classroom({ saveVideoManager: this.saveVideoManager });
  }

  handleOpenModal = () => {
    this.searchModal.openModal();
  };
}
