import { Classroom } from "./Classroom.js";
import { SearchModal } from "./SearchModal.js";

export class App {
  constructor() {
    this.classroom = new Classroom({ openModal: this.openModal });
    this.searchModal = new SearchModal();
  }

  openModal = () => {
    this.searchModal.show();
  };
}
