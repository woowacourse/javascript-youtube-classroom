import { Classroom } from './Classroom.js';
import { SearchModal } from './SearchModal.js';
import { apiFetcher } from '../model/apiFetcher.js';

export class App {
  constructor() {
    this.classroom = new Classroom({ openModal: this.openModal });
    this.searchModal = new SearchModal();
    this.apiFetcher = new apiFetcher();
  }

  openModal = () => {
    this.searchModal.show();
  };
}
