import '../css/index.css';
import Main from './pages/Main';
import SearchModal from './pages/SearchModal';

class App {
  constructor() {
    this.Main = new Main(document.querySelector('#app'));
    this.SearchModal = new SearchModal(document.querySelector('.modal-container'));
  }
}

new App();
