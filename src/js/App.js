import '../css/index.css';
import Index from './pages/Index';
import SearchModal from './pages/SearchModal';

class App {
  constructor() {
    this.Index = new Index(document.querySelector('#app'));
    this.SearchModal = new SearchModal(document.querySelector('.modal-container'));
  }
}

new App();
