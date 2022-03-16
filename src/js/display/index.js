import Navigation from './YoutubeClassRoom/Navigation';
import Modal from './Share/Modal';
import SearchForm from './YoutubeClassRoom/SearchForm';
import SearchResult from './YoutubeClassRoom/SearchResult';

const initDisplays = () => {
  new Modal();
  new Navigation();
  new SearchForm();
  new SearchResult();
};

export default initDisplays;
