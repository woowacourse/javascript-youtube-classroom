import Navigation from './YoutubeClassRoom/Navigation';
import Modal from './YoutubeClassRoom/Modal';
import SearchForm from './YoutubeClassRoom/SearchForm';
import SearchResult from './YoutubeClassRoom/SearchResult';
import MainContents from './YoutubeClassRoom/MainContents';

const initDisplays = () => {
  new Modal();
  new MainContents();
  new Navigation();
  new SearchForm();
  new SearchResult();
};

export default initDisplays;
