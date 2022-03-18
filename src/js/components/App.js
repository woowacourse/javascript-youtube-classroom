import VideoManager from "../manager/VideoManager.js";
import Classroom from "./Classroom.js";
import MenuBar from "./MenuBar.js";
import SearchModal from "./SearchModal/index.js";

export default class App {
  constructor() {
    this.videoManager = new VideoManager();
    this.searchModal = new SearchModal({ videoManager: this.videoManager });
    new MenuBar({
      handleOpenModal: this.handleOpenModal,
      handleWatchState: this.handleWatchState,
    });
    this.classroom = new Classroom({ videoManager: this.videoManager });
  }

  handleOpenModal = () => {
    this.searchModal.openModal();
  };

  handleWatchState = (state) => {
    this.classroom.setWatchState(state);
  };
}
