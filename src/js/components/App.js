import { Classroom } from './Classroom.js';
import { SearchModalView } from './SearchModalView.js';

export class App {
  constructor() {
    this.classroom = new Classroom({ openModal: this.openModal });
    this.searchModal = new SearchModalView();
  }

  openModal = () => {
    this.searchModal.show();
  };
}
