import Navigation from './YoutubeClassRoom/Navigation';
import Modal from './Share/Modal';
import SearchForm from './YoutubeClassRoom/SearchForm';
import SearchResult from './YoutubeClassRoom/SearchResult';

export default class IndexDisplay {
  constructor() {
    new Modal();
    this.youtubeClassRoomPage();
  }

  youtubeClassRoomPage() {
    new Navigation();
    new SearchForm();
    new SearchResult();
  }
}
