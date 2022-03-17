import Navigation from '@Display/YoutubeClassRoom/Navigation';
import Modal from '@Display/Share/Modal';
import SearchForm from '@Display/YoutubeClassRoom/SearchForm';
import SearchResult from '@Display/YoutubeClassRoom/SearchResult';
import '@Style/App.scss';
import '@Style/YoutubeClassRoom.scss';

document.addEventListener('DOMContentLoaded', () => {
  new Modal();
  new Navigation();
  new SearchForm();
  new SearchResult();
});
