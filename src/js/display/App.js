import Navigation from './YoutubeClassRoom/Navigation';
import Modal from './Share/Modal';
import SearchForm from './YoutubeClassRoom/SearchForm';
import SearchResult from './YoutubeClassRoom/SearchResult';
import '@Style/index.scss';

export default class App {
  constructor() {
    new Modal();
    new Navigation();
    new SearchForm();
    new SearchResult();
  }
}
