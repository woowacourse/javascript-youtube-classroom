import Navigation from '@Display/YoutubeClassRoom/Navigation';
import Modal from '@Display/Share/Modal';
import SearchForm from '@Display/YoutubeClassRoom/SearchForm';
import SearchResult from '@Display/YoutubeClassRoom/SearchResult';
import SaveList from '@Display/YoutubeClassRoom/SaveList';
import '@Style/App.scss';
import '@Style/YoutubeClassRoom.scss';

document.addEventListener('DOMContentLoaded', () => {
  Modal.enable('#app');

  new Navigation();
  new SaveList();
  new SearchForm();
  new SearchResult();
});
