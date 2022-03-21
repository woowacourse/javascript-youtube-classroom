import { ClassroomView } from './ClassroomView.js';
import { SearchModalView } from './SearchModalView.js';

export class App {
  constructor() {
    this.classroom = new ClassroomView({ openModal: this.openModal });
    this.searchModal = new SearchModalView({ closeModal: this.classroom.handleWillSeeVideoNav });
  }

  openModal = () => {
    this.searchModal.show();
  };
}
