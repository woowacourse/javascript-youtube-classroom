import SaveVideoManager from "../manager/SaveVideoManager.js";
import Classroom from "./Classroom.js";
import MenuBar from "./MenuBar.js";
import SearchModal from "./SearchModal/index.js";

export default class App {
  constructor() {
    this.saveVideoManager = new SaveVideoManager();
    this.searchModal = new SearchModal({ saveVideoManager: this.saveVideoManager });
    new MenuBar({ handleOpenModal: this.handleOpenModal });
    new Classroom({ saveVideoManager: this.saveVideoManager });
  }

  handleOpenModal = () => {
    this.searchModal.openModal();
  };
}
