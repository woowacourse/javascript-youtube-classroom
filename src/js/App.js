import '../css/index.css';
import Home from './pages/Home';
import SearchModal from './pages/SearchModal';

class App {
  constructor() {
    this.Home = new Home(document.querySelector('#app'));
    this.SearchModal = new SearchModal(
      document.querySelector('.modal-container')
    );
  }
}

new App();
