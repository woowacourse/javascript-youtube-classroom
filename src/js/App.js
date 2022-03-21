import '../css/index.css';
import Home from './components/Home';
import SearchModal from './components/SearchModal';

class App {
  constructor() {
    this.Home = new Home(document.querySelector('#app'));
    this.SearchModal = new SearchModal(
      document.querySelector('.modal-container')
    );
  }
}

new App();
