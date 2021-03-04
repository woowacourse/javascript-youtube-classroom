import MyYoutubeSearchController from './controller/my-youtube-search.js';
import StorageModel from './model/storage.js';
import YoutubeModel from './model/youtube.js';
import SearchView from './view/search.js';

const youtube = new YoutubeModel();
const storage = new StorageModel();
const view = new SearchView();
const controller = new MyYoutubeSearchController(youtube, storage, view);
controller.init();

const $searchButton = document.querySelector('#search-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$searchButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
